# GreenHarvest Agriculture

GreenHarvest is an existing React 19/Vite agriculture website with a FastAPI
assistant service. The website keeps its original products, solutions, calculator,
impact, testimonials, sustainability, and contact sections. New sections provide
agriculture-only AI chat and address-based map lookup.

## Frontend

```powershell
npm install
npm run dev
```

Vite proxies `/api` requests to `http://127.0.0.1:8000` during development. The
map uses OpenStreetMap's public Nominatim geocoder and map embed. Search results
are location pins, not surveyed property boundaries or ownership records.

## Backend setup

Use Python 3.11 or newer. From the project root:

```powershell
cd backend
py -3.11 -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
```

`crewai[litellm]` is required for CrewAI's Groq provider integration; the
requirements file installs it as part of backend setup.

Edit `backend/.env` with a **newly rotated** Groq key or a Gemini API key, your
Supabase project URL, and the Supabase publishable key. Groq is tried first when
both AI providers are configured; Gemini is used when Groq is absent or fails.
Get a Gemini key from Google AI Studio and set `GEMINI_API_KEY` locally. The
default Gemini model is `gemini-2.5-flash` and can be changed with `GEMINI_MODEL`.
The Supabase migration grants the public
key only the access needed for vector lookup and inserting chat/search records;
it cannot read stored interactions or write knowledge documents. Add a
service-role or Supabase secret key only when running the one-time knowledge
ingestion command. Keep those privileged and AI credentials in the backend
environment only.

Apply the migrations in `supabase/migrations/` in timestamp order in the Supabase
SQL Editor. The second migration adds the API permissions that the chat and map
endpoints require:

```powershell
supabase/migrations/20261110000000_create_agriculture_documents.sql
supabase/migrations/20261110110000_fix_agriculture_api_permissions.sql
```

The chat uses CrewAI/LiteLLM with Groq (`openai/gpt-oss-120b`) and can fall back
to Gemini (`gemini-2.5-flash`). Greetings are answered without an AI provider.
The assistant is limited to agriculture; questions beyond the retrieved guide
receive cautious general guidance or a request for more details. LangChain embeds
questions with `sentence-transformers/all-MiniLM-L6-v2`; Supabase pgvector
retrieves relevant passages before the assistant responds. If no guide documents
have been ingested or vector search is unavailable, the assistant retrieves up to
four relevant chunks from the bundled agriculture guide instead of sending the
entire guide to the model.
To index the guide in Supabase for vector retrieval, set a Supabase service-role
or secret key locally and run `python -m app.ingest` from `backend/`. The first
ingestion downloads the embedding model. `/api/health` reports missing backend
configuration without exposing credentials.

Successful chat exchanges and successful address searches (including the entered
query and returned coordinates) are stored indefinitely in Supabase, grouped by
an anonymous browser session ID. The AI and map sections disclose this behavior.
Contact-form submissions are not included in this storage.

Set `CORS_ORIGINS` in `backend/.env` to the exact frontend origins when deploying.
For a deployed frontend, set `VITE_API_BASE_URL` to the backend origin at build
time. Configure rate limiting and authentication at the API gateway before
public production deployment.

## Verification

Run `npm run build` and `npm run lint` from the project root. To exercise the full
AI workflow, first configure Groq and Supabase, apply the migration, ingest the
guide, start both servers, and submit an agriculture question in the AI Assistant
section. Map lookup can be tested independently with a known address.

Run the backend unit tests from `backend/` with the virtual environment active:

```powershell
python -m unittest discover -s tests -v
```
