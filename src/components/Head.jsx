import React from "react"

export const DomainPreconnect = () => {
  return (
    <>
      {/* spotify CDN does not support HTTP/2 LMFAO */}
      <link rel="preconnect" href="https://i.scdn.co" />
    </>
  )
}

export const FontPreload = () => {
  return (
    <>
      <link
        as="font"
        href="/fonts/wotfard/wotfard-regularitalic-webfont.ttf"
        key="/fonts/wotfard/wotfard-regularitalic-webfont.ttf"
        rel="preload"
        crossOrigin="anonymous"
      />
      <link
        as="font"
        href="/fonts/wotfard/wotfard-bolditalic-webfont.ttf"
        key="/fonts/wotfard/wotfard-bolditalic-webfont.ttf"
        rel="preload"
        crossOrigin="anonymous"
      />
      <link
        as="font"
        href="/fonts/wotfard/wotfard-semibolditalic-webfont.ttf"
        key="/fonts/wotfard/wotfard-semibolditalic-webfont.ttf"
        rel="preload"
        crossOrigin="anonymous"
      />
      <link
        as="font"
        href="/fonts/wotfard/wotfard-regular-webfont.ttf"
        key="/fonts/wotfard/wotfard-regular-webfont.ttf"
        rel="preload"
        crossOrigin="anonymous"
      />
      <link
        as="font"
        href="/fonts/wotfard/wotfard-medium-webfont.ttf"
        key="/fonts/wotfard/wotfard-medium-webfont.ttf"
        rel="preload"
        crossOrigin="anonymous"
      />
      <link
        as="font"
        href="/fonts/wotfard/wotfard-mediumitalic-webfont.ttf"
        key="/fonts/wotfard/wotfard-mediumitalic-webfont.ttf"
        rel="preload"
        crossOrigin="anonymous"
      />
      <link
        as="font"
        href="/fonts/wotfard/wotfard-semibold-webfont.ttf"
        key="/fonts/wotfard/wotfard-semibold-webfont.ttf"
        rel="preload"
        crossOrigin="anonymous"
      />
      <link
        as="font"
        href="/fonts/wotfard/wotfard-bold-webfont.ttf"
        key="/fonts/wotfard/wotfard-bold-webfont.ttf"
        rel="preload"
        crossOrigin="anonymous"
      />
    </>
  )
}
