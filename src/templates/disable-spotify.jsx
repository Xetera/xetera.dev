import React from "react"

/**
 * This is a really gross way to prevent the spotify button from rendering in previews
 */
export const DisableSpotify = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: "<style>.spotify-button{ display: none !important }</style>",
    }}
  />
)

export const DisableNavbar = () => (
  <div
    dangerouslySetInnerHTML={{
      __html:
        "<style>nav, .headroom-wrapper { display: none !important }</style>",
    }}
  />
)
