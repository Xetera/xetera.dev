#!/usr/bin/env bash

cp -r /opt/build/cache/personal .astro
cp -r /opt/build/cache/build dist
chown -R $USER: dist
chown -R $USER: .astro