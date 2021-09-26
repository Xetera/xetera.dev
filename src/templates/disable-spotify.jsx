import React from "react"

/**
 * This is a really gross way to prevent the spotify button from rendering in previews
 */
export const DisableSpotify = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: "<style>.spotify-button{ display: none }</style>",
    }}
  />
)

export const DisableNavbar = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: "<style>nav { display: none }</style>",
    }}
  />
)
