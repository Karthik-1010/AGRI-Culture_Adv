alter table public.documents enable row level security;
alter table public.ai_chat_interactions enable row level security;
alter table public.land_searches enable row level security;

grant select on public.documents to service_role;
grant insert, select on public.ai_chat_interactions to service_role;
grant insert, select on public.land_searches to service_role;

grant insert on public.ai_chat_interactions to anon, authenticated;
drop policy if exists ai_chat_interactions_insert
  on public.ai_chat_interactions;
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

alter function public.match_agriculture_documents(
  extensions.vector,
  integer
) security definer;
revoke all on function public.match_agriculture_documents(
  extensions.vector,
  integer
) from public;
grant execute on function public.match_agriculture_documents(
  extensions.vector,
  integer
) to anon, authenticated, service_role;
