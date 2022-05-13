import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Box } from "@chakra-ui/layout"
import { forwardRef } from "@chakra-ui/system"
import { Caption } from "./Markdown"

export const WideMedia = ({ children, caption, ...rest }) => {
  return (
    <ImageWrapper {...rest}>
      <Constrain>
        {children}
        <Caption mt={4}>{caption}</Caption>
      </Constrain>
    </ImageWrapper>
  )
}

export const WideMediaImage = ({ src, alt, caption, ...rest }) => {
  return (
    <WideMedia caption={caption} {...rest}>
      <img src={src} alt={alt} />
    </WideMedia>
  )
}

export const ImageWrapper = forwardRef(({ children, ...rest }, ref) => {
  const sx = {}
  if (!rest.tight) {
    sx.gridColumn = "1 / 4"
  }
  return (
    <Box as="figure" sx={sx} mt={4} {...rest}>
      {children}
    </Box>
  )
})

export const Constrain = props => {
  return (
    <Box maxWidth="1000px" mx="auto">
      {props.children}
    </Box>
  )
}

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
      }}
    />
  )
}
