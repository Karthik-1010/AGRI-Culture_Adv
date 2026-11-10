import os
import unittest
from unittest.mock import Mock, patch
from uuid import uuid4

from fastapi.testclient import TestClient
from fastapi import HTTPException
from postgrest.exceptions import APIError

from app import config, main


class GreenHarvestApiTests(unittest.TestCase):
    def setUp(self) -> None:
        self.settings = main.settings.copy()
        self.embedding_was_ready = main._embedding_ready.is_set()
        self.embedding_warmup_failed = main._embedding_warmup_failed
        main._embedding_ready.set()
        main._embedding_warmup_failed = False
        main.settings.update(
            {
                "groq_api_key": "test-groq-key",
                "gemini_api_key": "",
                "supabase_url": "https://example.supabase.co",
                "supabase_api_key": "test-publishable-key",
                "supabase_ingest_key": "test-service-role-key",
            }
        )
        self.client = TestClient(main.app)

    def tearDown(self) -> None:
        main.settings.update(self.settings)
        if self.embedding_was_ready:
            main._embedding_ready.set()
        else:
            main._embedding_ready.clear()
        main._embedding_warmup_failed = self.embedding_warmup_failed
        main.get_supabase_client.cache_clear()
        main.get_embeddings.cache_clear()

    def test_chat_fails_clearly_when_required_credentials_are_missing(self) -> None:
        main.settings["groq_api_key"] = ""
        main.settings["gemini_api_key"] = ""

        response = self.client.post(
            "/api/chat",
            json={"message": "How can I improve soil health?"},
        )

        self.assertEqual(response.status_code, 503)
        self.assertIn("GROQ_API_KEY or GEMINI_API_KEY", response.json()["detail"])

    def test_map_health_does_not_require_a_groq_key(self) -> None:
        main.settings["groq_api_key"] = ""

        response = self.client.get("/api/health")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["features"]["map_search"], "configured")
        self.assertEqual(response.json()["features"]["chat"], "needs_configuration")

    def test_chat_answers_greetings_without_ai_credentials(self) -> None:
        main.settings["groq_api_key"] = ""
        main.settings["gemini_api_key"] = ""
        main.settings["supabase_url"] = ""
        main.settings["supabase_api_key"] = ""

        with patch.object(main, "get_embeddings") as embeddings:
            response = self.client.post("/api/chat", json={"message": "hi"})

        self.assertEqual(response.status_code, 200)
        self.assertIn("GreenHarvest's agriculture assistant", response.json()["answer"])
        self.assertFalse(response.json()["saved"])
        embeddings.assert_not_called()

    def test_chat_saves_greetings_when_supabase_is_configured(self) -> None:
        supabase = Mock()
        with patch.object(main, "get_supabase_client", return_value=supabase):
            response = self.client.post("/api/chat", json={"message": "hello"})

        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json()["saved"])
        saved = supabase.table.return_value.insert.call_args.args[0]
        self.assertEqual(saved["question"], "hello")
        self.assertEqual(saved["sources"], [])

    def test_gemini_is_available_when_groq_key_is_missing(self) -> None:
        main.settings["groq_api_key"] = ""
        main.settings["gemini_api_key"] = "gemini-test-key"

        response = self.client.get("/api/health")

        self.assertEqual(response.json()["features"]["chat"], "configured")
        self.assertEqual(response.json()["provider"], "Gemini")
        self.assertEqual(response.json()["model"], "gemini-2.5-flash")

    def test_crewai_resolves_the_configured_groq_model(self) -> None:
        llm = main.GreenHarvestLLM(
            model=f"groq/{main.settings['groq_model']}",
            api_key="test-key",
        )

        self.assertEqual(llm.model, "groq/openai/gpt-oss-120b")

    def test_crewai_messages_remove_unsupported_cache_breakpoint_metadata(self) -> None:
        llm = main.GreenHarvestLLM(
            model=f"groq/{main.settings['groq_model']}",
            api_key="test-key",
        )

        messages = llm._format_messages_for_provider(
            [
                {
                    "role": "system",
                    "content": "Agriculture assistant",
                    "cache_breakpoint": True,
                }
            ]
        )

        self.assertEqual(
            messages,
            [{"role": "system", "content": "Agriculture assistant"}],
        )

    def test_bundled_guide_fallback_retrieves_relevant_bounded_chunks(self) -> None:
        documents = main.bundled_guide_documents("How can I improve soil health?")

        self.assertGreater(len(documents), 0)
        self.assertLessEqual(len(documents), 4)
        self.assertTrue(
            any("soil health" in document["content"].lower() for document in documents)
        )
        self.assertTrue(all(len(document["content"]) <= 900 for document in documents))

    def test_crewai_resolves_gemini_through_litellm(self) -> None:
        llm = main.LLM(
            model=f"gemini/{main.settings['gemini_model']}",
            provider="litellm",
            api_key="test-key",
        )

        self.assertEqual(llm.model, "gemini/gemini-2.5-flash")
        self.assertTrue(llm.is_litellm)

    def test_publishable_supabase_key_is_not_used_for_ingestion(self) -> None:
        environment = {
            "SUPABASE_URL": "https://example.supabase.co",
            "SUPABASE_PUBLISHABLE_KEY": "sb_publishable_public",
            "SUPABASE_SECRET_KEY": "sb_publishable_not_a_secret",
            "SUPABASE_SERVICE_ROLE_KEY": "",
        }
        with patch.dict(os.environ, environment, clear=True):
            config.get_settings.cache_clear()
            settings = config.get_settings()

        self.assertEqual(settings["supabase_api_key"], "sb_publishable_public")
        self.assertEqual(settings["supabase_ingest_key"], "")
        config.get_settings.cache_clear()

    def test_chat_uses_bundled_guide_when_rpc_and_save_permissions_are_missing(self) -> None:
        embeddings = Mock()
        embeddings.embed_query.return_value = [0.1] * 384
        supabase = Mock()
        supabase.rpc.return_value.execute.side_effect = APIError(
            {
                "code": "42501",
                "message": "permission denied for function match_agriculture_documents",
                "details": None,
                "hint": None,
            }
        )
        supabase.table.return_value.insert.return_value.execute.side_effect = APIError(
            {
                "code": "42501",
                "message": "permission denied for table ai_chat_interactions",
                "details": None,
                "hint": None,
            }
        )
        crew = Mock()
        crew.kickoff.return_value = "Start with a current soil test."

        with (
            patch.object(main, "get_embeddings", return_value=embeddings),
            patch.object(main, "get_supabase_client", return_value=supabase),
            patch.object(
                main,
                "bundled_guide_documents",
                return_value=[
                    {
                        "content": "Soil health guidance from the bundled guide.",
                        "metadata": {
                            "source": "Bundled GreenHarvest Agriculture Guide"
                        },
                    }
                ],
            ),
            patch.object(main, "LLM"),
            patch.object(main, "Agent"),
            patch.object(main, "Task"),
            patch.object(main, "Crew", return_value=crew),
        ):
            response = self.client.post(
                "/api/chat",
                json={"message": "How can I improve soil health?"},
            )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["answer"], "Start with a current soil test.")
        self.assertFalse(response.json()["saved"])
        self.assertIn("bundled agriculture guide", response.json()["warning"])
        self.assertIn("permissions migration", response.json()["warning"])

    def test_supabase_insert_permission_error_is_actionable(self) -> None:
        supabase = Mock()
        supabase.table.return_value.insert.return_value.execute.side_effect = APIError(
            {
                "code": "42501",
                "message": "permission denied for table land_searches",
                "details": None,
                "hint": None,
            }
        )

        with (
            patch.object(main, "get_supabase_client", return_value=supabase),
            self.assertRaises(HTTPException) as raised,
        ):
            main.save_interaction(
                "land_searches",
                {"query": "farm"},
                "Location could not be saved.",
            )

        self.assertIn("permissions migration", raised.exception.detail)

    def test_successful_chat_is_saved_and_returns_sources(self) -> None:
        session_id = str(uuid4())
        embeddings = Mock()
        embeddings.embed_query.return_value = [0.1] * 384
        supabase = Mock()
        supabase.rpc.return_value.execute.return_value.data = [
            {
                "content": "Use soil test results to plan nutrients.",
                "metadata": {"source": "GreenHarvest Agriculture Guide"},
            }
        ]
        crew = Mock()
        crew.kickoff.return_value = "Start with a current soil test."

        with (
            patch.object(main, "get_embeddings", return_value=embeddings),
            patch.object(main, "get_supabase_client", return_value=supabase),
            patch.object(
                main,
                "bundled_guide_documents",
                return_value=[
                    {
                        "content": "Soil health guidance from the bundled guide.",
                        "metadata": {
                            "source": "Bundled GreenHarvest Agriculture Guide"
                        },
                    }
                ],
            ),
            patch.object(main, "LLM"),
            patch.object(main, "Agent"),
            patch.object(main, "Task"),
            patch.object(main, "Crew", return_value=crew),
        ):
            response = self.client.post(
                "/api/chat",
                json={
                    "message": "How can I improve soil health?",
                    "session_id": session_id,
                },
            )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["answer"], "Start with a current soil test.")
        self.assertEqual(
            response.json()["sources"],
            [{"title": "GreenHarvest Agriculture Guide"}],
        )
        supabase.table.assert_called_once_with("ai_chat_interactions")
        saved = supabase.table.return_value.insert.call_args.args[0]
        self.assertEqual(saved["session_id"], session_id)
        self.assertEqual(saved["question"], "How can I improve soil health?")

    def test_chat_falls_back_to_gemini_when_groq_fails(self) -> None:
        main.settings["gemini_api_key"] = "gemini-test-key"
        embeddings = Mock()
        embeddings.embed_query.return_value = [0.1] * 384
        supabase = Mock()
        supabase.rpc.return_value.execute.return_value.data = [
            {
                "content": "Use soil test results to plan nutrients.",
                "metadata": {"source": "GreenHarvest Agriculture Guide"},
            }
        ]
        with (
            patch.object(main, "get_embeddings", return_value=embeddings),
            patch.object(main, "get_supabase_client", return_value=supabase),
            patch.object(
                main,
                "run_agriculture_crew",
                side_effect=[RuntimeError("Groq unavailable"), "Gemini answer"],
            ) as run_crew,
        ):
            response = self.client.post(
                "/api/chat",
                json={"message": "How can I improve soil health?"},
            )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["answer"], "Gemini answer")
        self.assertEqual(run_crew.call_count, 2)
        self.assertEqual(run_crew.call_args_list[0].args[0], "Groq")
        self.assertEqual(run_crew.call_args_list[1].args[0], "Gemini")
        self.assertTrue(run_crew.call_args_list[1].args[3])

    def test_chat_uses_bundled_guide_when_supabase_index_is_empty(self) -> None:
        embeddings = Mock()
        embeddings.embed_query.return_value = [0.1] * 384
        supabase = Mock()
        supabase.rpc.return_value.execute.return_value.data = []
        crew = Mock()
        crew.kickoff.return_value = "Start with a current soil test."
        task = Mock()

        with (
            patch.object(main, "get_embeddings", return_value=embeddings),
            patch.object(main, "get_supabase_client", return_value=supabase),
            patch.object(main, "LLM"),
            patch.object(main, "Agent"),
            patch.object(main, "Task", task),
            patch.object(main, "Crew", return_value=crew),
        ):
            response = self.client.post(
                "/api/chat",
                json={"message": "How can I improve soil health?"},
            )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json()["sources"],
            [{"title": "Bundled GreenHarvest Agriculture Guide"}],
        )
        self.assertIn("Soil health", task.call_args.kwargs["description"])
        self.assertIn(
            "Politely refuse unrelated topics",
            task.call_args.kwargs["description"],
        )
        self.assertIn(
            "references do not cover the question",
            task.call_args.kwargs["description"],
        )

    def test_chat_uses_bundled_guide_while_embeddings_are_warming(self) -> None:
        main._embedding_ready.clear()
        documents = [
            {
                "content": "Soil health guidance from the bundled guide.",
                "metadata": {"source": "Bundled GreenHarvest Agriculture Guide"},
            }
        ]
        supabase = Mock()

        with (
            patch.object(main, "get_embeddings") as embeddings,
            patch.object(main, "get_supabase_client", return_value=supabase),
            patch.object(main, "bundled_guide_documents", return_value=documents),
            patch.object(
                main,
                "generate_agriculture_answer",
                return_value="Start with a current soil test.",
            ),
        ):
            response = self.client.post(
                "/api/chat",
                json={"message": "How can I improve soil health?"},
            )

        self.assertEqual(response.status_code, 200)
        self.assertIn("warming up", response.json()["warning"])
        self.assertEqual(
            response.json()["sources"],
            [{"title": "Bundled GreenHarvest Agriculture Guide"}],
        )
        embeddings.assert_not_called()
        supabase.rpc.assert_not_called()

    def test_location_search_saves_address_and_coordinates(self) -> None:
        session_id = str(uuid4())
        supabase = Mock()
        geocoder_response = Mock(is_success=True, status_code=200)
        geocoder_response.json.return_value = [
            {
                "display_name": "Sacramento, California, United States",
                "lat": "38.5810606",
                "lon": "-121.4938950",
            }
        ]

        with (
            patch.object(main, "get_supabase_client", return_value=supabase),
            patch.object(main.httpx, "get", return_value=geocoder_response),
            patch.object(main.time, "sleep"),
        ):
            main._last_nominatim_request = 0.0
            response = self.client.post(
                "/api/locations/search",
                json={"query": "Sacramento, California", "session_id": session_id},
            )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["latitude"], 38.5810606)
        self.assertEqual(response.json()["longitude"], -121.493895)
        supabase.table.assert_called_once_with("land_searches")
        saved = supabase.table.return_value.insert.call_args.args[0]
        self.assertEqual(saved["query"], "Sacramento, California")
        self.assertEqual(saved["session_id"], session_id)

    def test_location_search_still_returns_map_if_supabase_insert_is_denied(self) -> None:
        supabase = Mock()
        supabase.table.return_value.insert.return_value.execute.side_effect = APIError(
            {
                "code": "42501",
                "message": "permission denied for table land_searches",
                "details": None,
                "hint": None,
            }
        )

        with (
            patch.object(main, "get_supabase_client", return_value=supabase),
            patch.object(
                main,
                "geocode_address",
                return_value=("Sacramento, California", 38.581, -121.494),
            ),
        ):
            response = self.client.post(
                "/api/locations/search",
                json={"query": "Sacramento, California"},
            )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["latitude"], 38.581)
        self.assertEqual(response.json()["longitude"], -121.494)
        self.assertFalse(response.json()["saved"])
        self.assertIn("permissions migration", response.json()["warning"])

    def test_location_search_rejects_unmatched_addresses(self) -> None:
        supabase = Mock()
        geocoder_response = Mock(is_success=True, status_code=200)
        geocoder_response.json.return_value = []

        with (
            patch.object(main, "get_supabase_client", return_value=supabase),
            patch.object(main.httpx, "get", return_value=geocoder_response),
            patch.object(main.time, "sleep"),
        ):
            main._last_nominatim_request = 0.0
            response = self.client.post(
                "/api/locations/search",
                json={"query": "not a real place"},
            )

        self.assertEqual(response.status_code, 404)
        supabase.table.assert_not_called()


if __name__ == "__main__":
    unittest.main()
