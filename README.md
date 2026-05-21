# Mission 2 Markets

Consulting, training, and e-commerce platform for professionals pursuing elite sales and leadership—veteran-led, open to all.

**Tagline:** From Service to Sales. From Mission to Market.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- [Supabase](https://supabase.com) (PostgreSQL, Auth, RLS)
- [Stripe](https://stripe.com) Checkout + webhooks

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Run all SQL files in [supabase/migrations/](supabase/migrations/) via the SQL Editor (001 → 003).
3. Create an admin user: **Authentication → Users → Add user** (email + password).
4. Copy **Project URL**, **anon key**, and **service role key** into `.env.local`.

### 3. Stripe setup

1. Create products/prices in the [Stripe Dashboard](https://dashboard.stripe.com) (test mode).
2. Optionally paste `price_...` IDs into product rows in `/admin/products`.
3. For local webhooks:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the webhook signing secret into `STRIPE_WEBHOOK_SECRET`.

### 4. Environment variables

Copy `.env.example` to `.env.local` and fill in all values.

### Insights distribution (optional)

When you **publish** an insight in admin, it can:

1. Appear on `/blog` as a card (newest at top, oldest at bottom)
2. Post to your **LinkedIn company page** (`LINKEDIN_ACCESS_TOKEN`, `LINKEDIN_ORGANIZATION_ID`)
3. Email **newsletter subscribers** via [Resend](https://resend.com) (`RESEND_API_KEY`, `EMAIL_FROM`)

Visitors subscribe on the Insights page or on each insight article.

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Admin panel: [http://localhost:3000/admin/login](http://localhost:3000/admin/login).

## Routes

| Public | Admin |
|--------|-------|
| `/` Home | `/admin` Dashboard |
| `/about` | `/admin/leads` CRM |
| `/services` | `/admin/products` |
| `/store` | `/admin/orders` |
| `/contact` | `/admin/blog` |
| `/blog` | |

## Deploy mission2markets.com

**Fast path:** see **[DEPLOY.md](DEPLOY.md)** (~45 min to partners-ready).

1. Run Supabase migrations → create admin user
2. Push repo to GitHub → import on Vercel
3. Set env vars (`NEXT_PUBLIC_SITE_URL=https://mission2markets.com` + Supabase keys)
4. Add domain **mission2markets.com** in Vercel → update DNS at registrar
5. Stripe webhook (when selling): `https://mission2markets.com/api/webhooks/stripe`

## Brand

- Background: `#0a0a0a`
- Gold accent: `#FFD700`
- Typography: Geist + Barlow (headings)
