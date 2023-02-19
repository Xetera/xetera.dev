#!/usr/bin/env bash

# caching assets that we don't need to save.
# going to need to clear this periodically to make sure
# that the saved books and spotify playlists dont clog the build folder
mkdir -p /opt/build/cache/personal
mkdir -p /opt/build/cache/build

cp -r .astro/cache /opt/build/cache/personal
cp -r dist/_astro /opt/build/cache/build

# these files have to be accessible to netlify in the build folder
cp _headers _redirects dist
