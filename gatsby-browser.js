import "typeface-jetbrains-mono"
import "./src/font.css"
import React from "react"
import {
  ChakraProvider,
  ColorModeProvider,
  GlobalStyle,
} from "@chakra-ui/react"
import theme from "./src/@chakra-ui/gatsby-plugin/theme"

export const wrapRootElement = ({ element, ...rest }) => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeProvider options={theme.config}>
        <GlobalStyle />
        {element}
      </ColorModeProvider>
    </ChakraProvider>
  )
}
