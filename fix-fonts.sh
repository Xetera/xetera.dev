#!/usr/bin/env bash

#check if font is installed
fc-match "Noto Color Emoji"

#if not installed install with following line
apt-get install fonts-noto-color-emoji -y
curl -L https://noto-website-2.storage.googleapis.com/pkgs/NotoColorEmoji-unhinted.zip -o NotoColorEmoji.zip
unzip NotoColorEmoji.zip

mkdir "$HOME/.fonts"

mv NotoColorEmoji.ttf "$HOME/.fonts"

cat << EOF > "$HOME/.fonts.conf"
<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
<alias>
 <family>sans-serif</family>
 <prefer>
   <family>Noto Color Emoji</family>
   <family>Noto Emoji</family>
 </prefer>
</alias>

<alias>
 <family>serif</family>
 <prefer>
   <family>Noto Color Emoji</family>
   <family>Noto Emoji</family>
 </prefer>
</alias>
</fontconfig>
EOF

fc-cache -fv
