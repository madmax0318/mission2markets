#!/usr/bin/env bash
# Wire Mission 2 Markets production: Supabase → Vercel
# Prerequisites: supabase login, vercel login, restored Supabase project
set -euo pipefail

cd "$(dirname "$0")/.."

SITE_URL="${NEXT_PUBLIC_SITE_URL:-https://www.mission2markets.com}"

echo "==> Mission 2 Markets production wiring"
echo ""

# --- Supabase ---
if ! npx supabase projects list &>/dev/null; then
  echo "Run: npx supabase login"
  exit 1
fi

echo "Supabase projects:"
npx supabase projects list
echo ""
read -rp "Supabase project ref (from dashboard URL): " PROJECT_REF

if [[ -z "$PROJECT_REF" ]]; then
  echo "Project ref required."
  exit 1
fi

npx supabase link --project-ref "$PROJECT_REF"
echo ""
echo "==> Pushing migrations..."
npx supabase db push

echo ""
echo "==> Fetching API keys..."
SUPABASE_URL="https://${PROJECT_REF}.supabase.co"
# Keys from linked project
ANON_KEY=$(npx supabase projects api-keys --project-ref "$PROJECT_REF" -o json 2>/dev/null | node -e "
  const d=JSON.parse(require('fs').readFileSync(0,'utf8'));
  const k=d.find(x=>x.name==='anon');
  if(!k){process.exit(1)}
  console.log(k.api_key);
" 2>/dev/null || true)

SERVICE_KEY=$(npx supabase projects api-keys --project-ref "$PROJECT_REF" -o json 2>/dev/null | node -e "
  const d=JSON.parse(require('fs').readFileSync(0,'utf8'));
  const k=d.find(x=>x.name==='service_role');
  if(!k){process.exit(1)}
  console.log(k.api_key);
" 2>/dev/null || true)

if [[ -z "$ANON_KEY" || -z "$SERVICE_KEY" ]]; then
  echo "Could not fetch API keys via CLI. Copy from Supabase Dashboard → Settings → API:"
  read -rp "NEXT_PUBLIC_SUPABASE_ANON_KEY: " ANON_KEY
  read -rsp "SUPABASE_SERVICE_ROLE_KEY: " SERVICE_KEY
  echo ""
fi

# --- Vercel env ---
echo ""
echo "==> Setting Vercel environment variables (production + preview)..."

set_vercel_env() {
  local name="$1"
  local value="$2"
  for env in production preview; do
    printf '%s' "$value" | npx vercel env add "$name" "$env" --force 2>/dev/null || \
      printf '%s' "$value" | npx vercel env add "$name" "$env"
  done
}

set_vercel_env "NEXT_PUBLIC_SITE_URL" "$SITE_URL"
set_vercel_env "NEXT_PUBLIC_SUPABASE_URL" "$SUPABASE_URL"
set_vercel_env "NEXT_PUBLIC_SUPABASE_ANON_KEY" "$ANON_KEY"
set_vercel_env "SUPABASE_SERVICE_ROLE_KEY" "$SERVICE_KEY"

echo ""
echo "==> Redeploying production..."
npx vercel --prod --yes

echo ""
echo "==> Done. Manual steps remaining:"
echo "  1. Supabase → Authentication → URL Configuration"
echo "     Site URL: $SITE_URL"
echo "     Redirect URLs: ${SITE_URL}/**"
echo "  2. Supabase → Authentication → Users → Add user (admin)"
echo "  3. Test: curl -X POST ${SITE_URL}/api/leads -H 'Content-Type: application/json' -d '{\"name\":\"Test\",\"email\":\"test@example.com\",\"message\":\"hi\"}'"
echo ""
