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
  TzuyuAvatar() {
    return (
      <StaticImage
        {...common}
        src="../../content/assets/avatars/tzuyu.png"
        alt="Tzuyu Avatar"
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
