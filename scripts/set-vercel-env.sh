#!/usr/bin/env bash
# Push env vars from .env.local to Vercel (production + preview)
set -euo pipefail

cd "$(dirname "$0")/.."

if [[ ! -f .env.local ]]; then
  echo "Missing .env.local — copy .env.example and fill in values."
  exit 1
fi

# shellcheck disable=SC1091
set -a
source .env.local
set +a

required=(
  NEXT_PUBLIC_SITE_URL
  NEXT_PUBLIC_SUPABASE_URL
  NEXT_PUBLIC_SUPABASE_ANON_KEY
  SUPABASE_SERVICE_ROLE_KEY
)

for key in "${required[@]}"; do
  if [[ -z "${!key:-}" ]]; then
    echo "Missing required variable: $key"
    exit 1
  fi
done

add_env() {
  local name="$1"
  local value="$2"
  local env="$3"
  printf '%s' "$value" | npx vercel env add "$name" "$env" --force 2>/dev/null || \
    printf '%s' "$value" | npx vercel env add "$name" "$env"
}

for env in production preview; do
  echo "==> $env"
  for key in "${required[@]}"; do
    add_env "$key" "${!key}" "$env"
    echo "    $key"
  done
done

echo ""
echo "Done. Redeploy with: npx vercel --prod --yes"
