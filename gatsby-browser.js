import "typeface-sriracha"
import "typeface-jetbrains-mono"
import "./static/fonts/wotfard/stylesheet.css"
import * as React from "react"
import theme from "./src/@chakra-ui/gatsby-plugin/theme"
import { ChakraProvider } from "@chakra-ui/react"

export const wrapRootElement = ({ element }) => {
  <ChakraProvider
    theme={theme}
    resetCSS={true}
  >
    {element}
  </ChakraProvider>
}