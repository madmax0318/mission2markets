-- Newsletter subscribers + insight distribution tracking

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;

create policy "subscribers_insert_anon" on public.newsletter_subscribers
  for insert to anon with check (true);

create policy "subscribers_select_auth" on public.newsletter_subscribers
  for select to authenticated using (true);

alter table public.blog_posts
  add column if not exists linkedin_shared_at timestamptz,
  add column if not exists newsletter_sent_at timestamptz;
