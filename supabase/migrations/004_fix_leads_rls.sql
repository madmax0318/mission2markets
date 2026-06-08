-- Ensure public contact form can insert leads via anon (API fallback)
alter table public.leads enable row level security;

drop policy if exists "leads_insert_anon" on public.leads;
create policy "leads_insert_anon" on public.leads
  for insert to anon with check (true);

drop policy if exists "leads_select_auth" on public.leads;
create policy "leads_select_auth" on public.leads
  for select to authenticated using (true);

drop policy if exists "leads_update_auth" on public.leads;
create policy "leads_update_auth" on public.leads
  for update to authenticated using (true);
