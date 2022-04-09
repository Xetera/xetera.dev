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
  narigon() {
    return (
      <StaticImage
        {...common}
        src="../../content/assets/avatars/narigon.png"
        alt="narigon"
      />
    )
  },
  TzuyuAvatar() {
    return (
      <StaticImage
        {...common}
        src="../../content/assets/avatars/tzuyu.png"
        alt="Tzuyu Avatar"
      />
    )
  },
  KibbAvatar() {
    return (
      <StaticImage
        {...common}
        src="../../content/assets/avatars/kibb.png"
        alt="Kibb Avatar"
      />
    )
  },
  JiuAvatar() {
    return (
      <StaticImage
        {...common}
        src="../../content/assets/avatars/jiu.png"
        alt="Kim Minji Avatar"
      />
    )
  },
}
