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

export const Xetera = () => {
  return <StaticImage {...common} src="./xetera_girlboss_2.jpeg" alt="Xetera" />
}

export const XeteraMedium = () => {
  return (
    <StaticImage
      width={300}
      height={300}
      quality={100}
      layout="fixed"
      placeholder="tracedSVG"
      src="./xetera_girlboss_2.jpeg"
      alt="Xetera"
    />
  )
}
export const XeteraLarge = () => {
  return (
    <StaticImage
      width={600}
      height={600}
      quality={100}
      layout="fixed"
      src="./xetera_girlboss_2.jpeg"
      alt="Xetera"
    />
  )
}

export const TzuyuAvatar = () => {
  return <StaticImage {...common} src="./tzuyu.png" alt="Tzuyu Avatar" />
}

export const JiuAvatar = () => {
  return <StaticImage {...common} src="./jiu.png" alt="Kim Minji Avatar" />
}

export const Dubu = () => (
  <StaticImage {...common} src="./dubu.png" alt="Dahyun" />
)

export const DubuConfused = () => (
  <StaticImage {...common} src="./dahyun_confused.jpg" alt="Confused Dahyun" />
)
export const RobPike = () => (
  <StaticImage {...common} src="./rob_pike.png" alt="Rob Pike" />
)

export const Drac = () => <StaticImage src="./drac.png" {...common} />

export const Marco = () => <StaticImage src="./marco.png" {...common} />
