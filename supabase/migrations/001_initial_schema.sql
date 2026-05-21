-- Mission 2 Markets — initial schema

create extension if not exists "pgcrypto";

-- Leads (CRM)
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  status text not null default 'New' check (status in ('New', 'Contacted', 'In Progress', 'Closed')),
  created_at timestamptz not null default now()
);

-- Products (store)
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  price_cents integer not null check (price_cents >= 0),
  image_url text,
  stripe_price_id text,
  category text not null default 'book' check (category in ('book', 'training', 'consulting')),
  featured boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Orders (Stripe webhooks)
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  stripe_session_id text not null unique,
  customer_email text,
  product_id uuid references public.products(id) on delete set null,
  amount_total integer,
  status text not null default 'paid',
  created_at timestamptz not null default now()
);

-- Blog posts
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  body text not null default '',
  published boolean not null default false,
  created_at timestamptz not null default now()
);

-- RLS
alter table public.leads enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.blog_posts enable row level security;

-- Leads: public can insert; authenticated can read/update
create policy "leads_insert_anon" on public.leads for insert to anon with check (true);
create policy "leads_select_auth" on public.leads for select to authenticated using (true);
create policy "leads_update_auth" on public.leads for update to authenticated using (true);

-- Products: public read active; authenticated full access
create policy "products_select_active" on public.products for select to anon using (active = true);
create policy "products_select_auth" on public.products for select to authenticated using (true);
create policy "products_insert_auth" on public.products for insert to authenticated with check (true);
create policy "products_update_auth" on public.products for update to authenticated using (true);
create policy "products_delete_auth" on public.products for delete to authenticated using (true);

-- Orders: authenticated read only (insert via service role in webhook)
create policy "orders_select_auth" on public.orders for select to authenticated using (true);

-- Blog: public read published; authenticated full access
create policy "blog_select_published" on public.blog_posts for select to anon using (published = true);
create policy "blog_select_auth" on public.blog_posts for select to authenticated using (true);
create policy "blog_insert_auth" on public.blog_posts for insert to authenticated with check (true);
create policy "blog_update_auth" on public.blog_posts for update to authenticated using (true);
create policy "blog_delete_auth" on public.blog_posts for delete to authenticated using (true);

-- Seed products
insert into public.products (title, description, price_cents, image_url, category, featured, active) values
  (
    'Mission Playbook',
    'The definitive guide for professionals pursuing elite sales—prospecting, objection handling, and negotiation.',
    8900,
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
    'book',
    true,
    true
  ),
  (
    'Sales Bootcamp',
    'Intensive 8-week program translating mission-focused leadership into enterprise closing frameworks.',
    249700,
    'https://images.unsplash.com/photo-1521737711864-e397b37306c0?w=800&q=80',
    'training',
    true,
    true
  ),
  (
    '1:1 Executive Coaching',
    'Personalized strategy sessions with sales executives who have built seven-figure pipelines.',
    35000,
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    'consulting',
    false,
    true
  ),
  (
    'Corporate Partnership Retainer',
    'Monthly consulting retainer for organizations building high-performance sales teams.',
    500000,
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
    'consulting',
    false,
    true
  );

-- Seed blog posts
insert into public.blog_posts (title, slug, excerpt, body, published) values
  (
    'Why We Built Mission 2 Markets',
    'why-we-built-mission-2-markets',
    'Two Army veterans turned elite sales leaders share why they started Mission 2 Markets—and why they are passionate about helping every professional grow.',
    '## From Service to Sales. From Mission to Market.

Mission 2 Markets was not built to sell another generic training program. It was built because two founders—Patrick Steiner and Andrew Letarte—lived the hard transition from military leadership to high-stakes sales careers, and they refused to watch talented people struggle without a playbook.

We are veteran-led. We are open to everyone. And we are obsessed with one outcome: helping people grow in their careers with discipline, integrity, and results that last.

## Two paths, one standard

**Patrick Steiner** commissioned as a U.S. Army officer after serving as a Human Intelligence Collector in Iraq. He led infantry platoons and company-level operations through Ranger School, Airborne, and deployments to Afghanistan. After the military, he built a career in cardiac rhythm management—rising from field clinical specialist to regional sales director at BIOTRONIK and now leading territory sales at RhythmScience. His MBA from Notre Dame’s Mendoza College of Business sharpened the business lens; his time in uniform forged the leadership standard.

**Andrew Letarte** served nearly a decade as a U.S. Army Infantry Officer—from platoon operations to senior logistics and battalion staff roles at Fort Lewis and Fort Campbell. He managed complex missions, multi-million-dollar accountability, and teams under real pressure. In medical technology, he progressed from field clinical specialist to principal account manager at Inari Medical, with prior tenure at BIOTRONIK. His MBA from the University of Iowa’s Tippie College of Business and finance foundation from Providence College complement a career defined by competitive execution and clear communication.

Different deployments. Different sales territories. Same conclusion: the traits that win in military operations—preparation, ownership, adaptability, and mission focus—are the same traits that win in enterprise sales.

## What we saw—and what we could not ignore

We watched sharp, hardworking people enter civilian careers with world-class work ethic and no clear system for translating it into revenue, influence, or advancement. Some were veterans. Many were not. All of them deserved better than vague advice and motivational posters.

We also saw organizations leave performance on the table: inconsistent onboarding, weak sales discipline, and leaders who had never been coached with the rigor required to build elite teams.

Mission 2 Markets exists to close that gap.

## Our mission

We help professionals at every stage—whether you are changing careers, breaking into B2B sales, leading a team, or building a corporate partnership—develop the skills and habits of elite performers.

That means:

- **Clarity** — Define the objective before you engage. No activity without purpose.
- **Discipline** — Build daily standards that create freedom, not burnout.
- **Coaching** — Get honest feedback, practical frameworks, and accountability from operators who have carried quota and led people.
- **Community** — Join a collective that lifts people up and never leaves a teammate behind on the sales battlefield.

We translate military-grade preparation into marketplace results—not because only veterans benefit, but because this methodology works for anyone willing to do the work.

## Why we are passionate about your growth

We have sat across the table from customers when the deal mattered. We have rebuilt pipelines from zero. We have led teams through uncertainty. We know how it feels to be capable and still stuck—because we have been there.

That is why we coach with respect and push with standards. We do not want inspiration for a week. We want transformation you can measure: stronger discovery, cleaner negotiation, better leadership, and a career trajectory you own.

If you are ready to stop guessing and start executing, you are in the right place.

## What comes next

Explore our programs and resources on the site, connect with us through a consultation, and follow this blog for leadership insights from the field—not theory from the sidelines.

**Mission 2 Markets is veteran-led. Built for everyone. Committed to your growth.**

[Meet the founders](/founders) · [Book a consultation](/contact)',
    true
  ),
  (
    'From Battlefield Brief to Sales Discovery',
    'battlefield-brief-to-discovery',
    'How military mission planning maps directly to elite discovery calls.',
    '## Mission planning meets pipeline

The same discipline you used to prepare for operations applies to discovery. Define the objective, identify constraints, rehearse objections, and execute with accountability.

Professionals who treat the first call like a recon mission—gather intel before proposing solutions—consistently outperform peers who pitch too early.',
    true
  );
