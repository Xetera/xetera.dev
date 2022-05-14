import { StaticImage } from "gatsby-plugin-image"
import React from "react"

const sharedProps = {
  height: 32,
  width: 32,
}

export const FiveHead = () => (
  <img
    src="https://i.kym-cdn.com/photos/images/facebook/001/861/983/bf5.png"
    height="30"
    align="center"
    title="5head"
    alt="5head"
  />
)

export const Angery = () => <StaticImage src="./angery.png" {...sharedProps} />

export const Whatsapp = () => <StaticImage src="./whatsapp.png" />

export const Downvote = () => (
  <StaticImage src="./downvote.png" {...sharedProps} />
)

export const ProllyNod = () => (
  <StaticImage src="./prollynod.gif" {...sharedProps} />
)

export const PeepoBoomer = () => (
  <StaticImage src="./peepoboomer.png" width={40} height={40} />
)

export const Uhuh = () => <StaticImage src="./uhuh.png" {...sharedProps} />

export const YooYikes = () => (
  <StaticImage src="./yooyikes.png" {...sharedProps} />
)

export const SanaKek = () => (
  <StaticImage src="./sana_kek.png" {...sharedProps} />
)

export const SanaShrug = () => (
  <StaticImage src="./sana_shrug.gif" {...sharedProps} />
)

export const Clap = () => <StaticImage src="./clap.png" {...sharedProps} />

export const ThumbsDown = () => (
  <StaticImage src="./thumbs_down.png" {...sharedProps} />
)

export const ThisTbh = () => (
  <StaticImage src="./thistbh.png" {...sharedProps} />
)

export const ThisArrow = () => (
  <StaticImage src="./thisarrow.gif" {...sharedProps} />
)

export const Kekw = () => <StaticImage src="./kekw.png" {...sharedProps} />

export const Omegalul = () => (
  <StaticImage src="./omegalul.png" {...sharedProps} />
)
