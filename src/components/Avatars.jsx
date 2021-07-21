import React from "react"
import { StaticImage } from "gatsby-plugin-image"

const common = {
  placeholder: "tracedSVG",
  layout: "fixed",
  quality: 100,
  objectFit: "cover",
  height: 40,
  width: 40,
}

export const avatars = {
  Xetera() {
    return (
      <StaticImage
        {...common}
        src="../../content/assets/avatars/xetera.png"
        alt="Xetera"
      />
    )
  },
  Tzuyu() {
    return (
      <StaticImage
        {...common}
        src="../../content/assets/avatars/tzuyu.png"
        alt="Tzuyu"
      />
    )
  },
  Jiu() {
    return (
      <StaticImage
        {...common}
        src="../../content/assets/avatars/jiu.png"
        alt="Kim Minji"
      />
    )
  },
}
