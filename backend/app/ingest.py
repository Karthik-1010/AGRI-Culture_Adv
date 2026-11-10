from pathlib import Path
from uuid import NAMESPACE_URL, uuid5

from langchain_huggingface import HuggingFaceEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from supabase import create_client

from app.config import get_settings


def main() -> None:
    settings = get_settings()
    required = {
        "SUPABASE_URL": settings["supabase_url"],
        "SUPABASE_SECRET_KEY or SUPABASE_SERVICE_ROLE_KEY": settings[
            "supabase_ingest_key"
        ],
    }
    missing = [name for name, value in required.items() if not value]
    if missing:
        raise RuntimeError(f"Configure the backend settings: {', '.join(missing)}.")

    guide_path = Path(__file__).resolve().parents[1] / "knowledge" / "agriculture.md"
    guide = guide_path.read_text(encoding="utf-8")
    chunks = RecursiveCharacterTextSplitter(
        chunk_size=900,
        chunk_overlap=120,
    ).split_text(guide)
    embeddings = HuggingFaceEmbeddings(model_name=settings["embedding_model"])
    vectors = embeddings.embed_documents(chunks)
    rows = [
        {
            "id": str(uuid5(NAMESPACE_URL, f"greenharvest:{index}:{chunk}")),
            "content": chunk,
            "metadata": {
                "source": "GreenHarvest Agriculture Guide",
                "chunk": index,
            },
            "embedding": vector,
        }
        for index, (chunk, vector) in enumerate(zip(chunks, vectors, strict=True))
    ]
    supabase = create_client(
        settings["supabase_url"],
        settings["supabase_ingest_key"],
    )
    supabase.table("documents").upsert(rows, on_conflict="id").execute()
    print(f"Ingested {len(rows)} agriculture knowledge chunks into Supabase.")


if __name__ == "__main__":
    main()
