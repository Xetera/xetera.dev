import "typeface-jetbrains-mono"
import React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import theme from "./src/@chakra-ui/gatsby-plugin/theme"

export const wrapRootElement = ({ element, ...rest }) => {
  return <ChakraProvider theme={theme}>{element}</ChakraProvider>
}
