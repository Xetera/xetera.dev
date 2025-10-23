#!/usr/bin/env bash
# this is run by netlify. Feel free to delete if you're forking

set -o errexit
set -o pipefail
set -o nounset

# these files have to be accessible to netlify in the build folder
cp _headers _redirects dist

if [ -n "$CLOUDFLARE_API_KEY" ] && [ -n "$CLOUDFLARE_EMAIL" ] && [ -n "$CLOUDFLARE_ZONE_ID" ] ; then
  # upload to cloudflare
  result=$(curl -X POST "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/purge_cache" \
    -H "Authorization: Bearer $CLOUDFLARE_API_KEY" \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "Content-Type: application/json" \
    --data '{"purge_everything":true}')
  echo $result
else
  echo "CLOUDFLARE_API_KEY and CLOUDFLARE_EMAIL and CLOUDFLARE_ZONE_ID are not set, skipping cloudflare purge"
fi
