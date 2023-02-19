#!/usr/bin/env bash

if [ -d "/opt/build/cache/personal" ]; then
  cp -r /opt/build/cache/build dist
  chown -R $USER: dist
fi

if [ -d "/opt/build/cache/personal" ]; then
  cp -r /opt/build/cache/personal .astro
  chown -R $USER: .astro
fi