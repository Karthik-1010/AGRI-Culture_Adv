import os
from functools import lru_cache
from pathlib import Path

from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parents[1] / ".env")


@lru_cache
def get_settings() -> dict[str, str]:
    supabase_secret_key = os.getenv("SUPABASE_SECRET_KEY", "").strip()
    supabase_service_role_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "").strip()
    # A publishable key is public and must never be treated as an elevated key.
    elevated_keys = [
        key
        for key in (supabase_secret_key, supabase_service_role_key)
        if key and not key.startswith("sb_publishable_")
    ]
    supabase_publishable_key = (
        os.getenv("SUPABASE_PUBLISHABLE_KEY", "").strip()
        or os.getenv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", "").strip()
    )
    return {
        "groq_api_key": os.getenv("GROQ_API_KEY", "").strip(),
        "groq_model": os.getenv("GROQ_MODEL", "openai/gpt-oss-120b").strip(),
        "gemini_api_key": os.getenv("GEMINI_API_KEY", "").strip(),
        "gemini_model": os.getenv("GEMINI_MODEL", "gemini-2.5-flash").strip(),
        "supabase_url": os.getenv("SUPABASE_URL", "").strip(),
        "supabase_api_key": (
            (elevated_keys[0] if elevated_keys else "") or supabase_publishable_key
        ),
        "supabase_ingest_key": elevated_keys[0] if elevated_keys else "",
        "embedding_model": os.getenv(
            "EMBEDDING_MODEL",
            "sentence-transformers/all-MiniLM-L6-v2",
        ).strip(),
        "cors_origins": os.getenv(
            "CORS_ORIGINS",
            "http://localhost:5173,http://127.0.0.1:5173",
        ),
    }
