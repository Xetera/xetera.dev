#!/usr/bin/env bash

#check if font is installed
sudo fc-match "Noto Color Emoji"

#if not installed install with following line
#sudo apt-get install fonts-noto-color-emoji -y

#font will be in shared folder but puppeteer looks into local folder  so copy there

#copy font - create folder if not exists
mkdir -p /usr/local/share/fonts
cp /usr/share/fonts/truetype/noto/NotoColorEmoji.ttf /usr/local/share/fonts/
chmod 644 /usr/local/share/fonts/NotoColorEmoji.ttf

#clear font cache
fc-cache -fv
