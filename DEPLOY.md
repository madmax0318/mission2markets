# Deploy mission2markets.com (fast path for partners)

Target: **https://mission2markets.com** on Vercel + Supabase.

Estimated time: **~45 minutes** (DNS may take up to 24h; often 15–30 min).

---

## What partners will see without extra setup

These pages work immediately after deploy (even before Supabase):

- Home, About, Services, Founders, Insights (inaugural article + cards)
- Contact page UI (form needs Supabase to save leads)
- Store UI (products need Supabase seed + Stripe for checkout)

---

## Step 1 — Supabase (~15 min)

1. [supabase.com](https://supabase.com) → **New project**
2. **SQL Editor** → run each file in order:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_inaugural_mission_blog_post.sql`
   - `supabase/migrations/003_insights_distribution.sql`
3. **Authentication → Users → Add user** (your admin email + password)
4. **Project Settings → API** — copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon public → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role (secret) → `SUPABASE_SERVICE_ROLE_KEY`

---

## Step 2 — GitHub (~5 min)

```powershell
cd c:\Users\dave\Documents\Apps\M2M
git add .
git commit -m "Mission 2 Markets production site"
git branch -M main
git remote add origin https://github.com/YOUR_ORG/mission2markets.git
git push -u origin main
```

(Create an empty repo on GitHub first if you do not have one.)

---

## Step 3 — Vercel (~10 min)

1. [vercel.com](https://vercel.com) → **Add New → Project** → import your GitHub repo
2. Framework: **Next.js** (auto-detected)
3. **Environment variables** (Production + Preview):

| Variable | Value |
|----------|--------|
| `NEXT_PUBLIC_SITE_URL` | `https://mission2markets.com` |
| `NEXT_PUBLIC_SUPABASE_URL` | from Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | from Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | from Supabase |
| `STRIPE_SECRET_KEY` | optional for launch |
| `STRIPE_WEBHOOK_SECRET` | optional for launch |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | optional for launch |

4. **Deploy**

CLI alternative (after `npx vercel login`):

```powershell
cd c:\Users\dave\Documents\Apps\M2M
npx vercel link
npx vercel env pull .env.local
# Add env vars in Vercel dashboard, then:
npx vercel --prod
```

---

## Step 4 — Custom domain mission2markets.com (~10 min + DNS wait)

1. Vercel project → **Settings → Domains**
2. Add `mission2markets.com` and `www.mission2markets.com`
3. At your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.), set DNS as Vercel instructs:

**Recommended (Vercel DNS):**

| Type | Name | Value |
|------|------|--------|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

4. Wait for **Valid Configuration** in Vercel (often 15–30 minutes)
5. Enable **Redirect www → apex** (or apex → www—pick one canonical URL)

Update `NEXT_PUBLIC_SITE_URL` to `https://mission2markets.com` if you change it after first deploy.

---

## Step 5 — Smoke test before partner demo

- [ ] https://mission2markets.com loads (home, gold/black brand)
- [ ] /about, /services, /founders, /blog
- [ ] /contact — submit test lead → appears in /admin/leads
- [ ] /admin/login — sign in with Supabase admin user
- [ ] /store — products visible (from migration seed)

**Optional before partners:** Stripe test/live keys, Resend email, LinkedIn API (see `.env.example`).

---

## Step 6 — Stripe (when ready to sell)

1. Stripe Dashboard → Products/Prices
2. Add `price_...` IDs in Admin → Products
3. Webhook: `https://mission2markets.com/api/webhooks/stripe`  
   Event: `checkout.session.completed`  
4. Set `STRIPE_WEBHOOK_SECRET` in Vercel env → **Redeploy**

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| 500 on all pages | Supabase env vars missing/wrong; check Vercel logs |
| Contact form fails | Run migrations; check RLS policies |
| Admin login fails | Create user in Supabase Auth (not just Postgres) |
| Insights empty | Run `002_inaugural_mission_blog_post.sql` |
| Old content | Redeploy after env change |

---

## Partner-demo minimum checklist

- [x] Marketing site live on mission2markets.com
- [ ] Supabase + contact form working
- [ ] Admin login for you
- [ ] Insights cards + mission article
- [ ] Founders page (add headshots to `public/founders/` when ready)
