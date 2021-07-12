import React from "react"
import { ToastContext } from "./Popup"
import { BackgroundImage } from "./Image"
import { Box, Flex, Grid } from "@chakra-ui/layout"
import Navbar from "./Navbar"
import { forwardRef } from "@chakra-ui/system"
import { domAnimation, LazyMotion } from "framer-motion"
import { transition } from "../@chakra-ui/gatsby-plugin/theme"

export const Hr = forwardRef((props, ref) => {
  return (
    <Box
      as="hr"
      my={3}
      transition={transition}
      layerStyle="bgSubtle"
      border="none"
      height="1px"
      {...props}
      ref={ref}
    />
  )
})

export const layoutContentPadding = [6, 8]

export const LayoutContent = forwardRef((props, ref) => {
  return (
    <Box width="100%" overflow="hidden">
      <Grid
        as="main"
        layerStyle="textPrimary"
        fontWeight="regular"
        gap={12}
        p={layoutContentPadding}
        ref={ref}
        {...props}
      >
        {props.children}
      </Grid>
    </Box>
  )
})

export function Layout({
  children,
  header,
  imageTop,
  imageBottom,
  article,
  ...rest
}) {
  const [toastJsx, setToastJsx] = React.useState(null)

  return (
    <Flex flexFlow="column nowrap">
      <Navbar />
      <LazyMotion features={domAnimation}>
        <ToastContext.Provider value={{ jsx: toastJsx, setJsx: setToastJsx }}>
          <Box {...rest}>{children}</Box>
        </ToastContext.Provider>
      </LazyMotion>
    </Flex>
  )
}
