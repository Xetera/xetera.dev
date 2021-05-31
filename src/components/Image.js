import React from "react"
import { GatsbyImage } from "gatsby-plugin-image";

function imageStyle(options = {}) {
  return {
    pointerEvents: "none",
    width: "100%",
    position: "absolute",
    objectFit: "cover",
    ...options,
    opacity: options.opacity ?? 0.05,
  }
}

export function BackgroundImage({ image, options, pos }) {
  const isTop = pos === "top"
  return (
    <GatsbyImage
      image={image}
      className={`absolute left-0 right-0 ${
        isTop ? "top-0" : "bottom-0"
      } h-half-vh lg:h-inherit h-half-vh md:h-screen`}
      style={imageStyle(options)}
      imgStyle={{
        objectPosition: isTop ? "center top" : "center bottom",
      }} />
  );
}
