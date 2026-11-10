create extension if not exists vector with schema extensions;

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  metadata jsonb not null default '{}'::jsonb,
  embedding extensions.vector(384) not null
);

create index if not exists documents_embedding_idx
  on public.documents
  using hnsw (embedding extensions.vector_cosine_ops);

alter table public.documents enable row level security;
grant select, insert, update, delete on public.documents to service_role;

create table if not exists public.ai_chat_interactions (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null,
  question text not null,
  answer text not null,
  sources jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists ai_chat_interactions_session_created_idx
  on public.ai_chat_interactions (session_id, created_at);

alter table public.ai_chat_interactions enable row level security;
grant insert, select on public.ai_chat_interactions to service_role;
grant insert on public.ai_chat_interactions to anon, authenticated;

drop policy if exists ai_chat_interactions_insert on public.ai_chat_interactions;
create policy ai_chat_interactions_insert
  on public.ai_chat_interactions
  for insert
  to anon, authenticated
  with check (
    char_length(question) between 1 and 2000
    and char_length(answer) between 1 and 12000
    and jsonb_typeof(sources) = 'array'
    and jsonb_array_length(sources) <= 10
  );

create table if not exists public.land_searches (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null,
  query text not null,
  display_name text not null,
  latitude double precision not null check (latitude between -90 and 90),
  longitude double precision not null check (longitude between -180 and 180),
  created_at timestamptz not null default now()
);

create index if not exists land_searches_session_created_idx
  on public.land_searches (session_id, created_at);

alter table public.land_searches enable row level security;
grant insert, select on public.land_searches to service_role;
grant insert on public.land_searches to anon, authenticated;

drop policy if exists land_searches_insert on public.land_searches;
create policy land_searches_insert
  on public.land_searches
  for insert
  to anon, authenticated
  with check (
    char_length(query) between 2 and 250
    and char_length(display_name) between 1 and 500
    and latitude between -90 and 90
    and longitude between -180 and 180
  );

create or replace function public.match_agriculture_documents(
  query_embedding extensions.vector(384),
  match_count integer default 4
)
returns table (
  id uuid,
  content text,
  metadata jsonb,
  similarity double precision
)
language sql
stable
security definer
set search_path = public, extensions
as $$
  select
    documents.id,
    documents.content,
    documents.metadata,
    1 - (documents.embedding <=> query_embedding) as similarity
  from public.documents
  order by documents.embedding <=> query_embedding
  limit greatest(1, least(match_count, 10));
$$;

revoke all on function public.match_agriculture_documents(extensions.vector, integer)
  from public, anon, authenticated;
grant execute on function public.match_agriculture_documents(extensions.vector, integer)
  to anon, authenticated, service_role;
