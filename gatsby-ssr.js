import React from "react"
import { ColorModeScript } from "@chakra-ui/react"
import theme from "./src/@chakra-ui/gatsby-plugin/theme"
import { ChakraProvider } from "@chakra-ui/react"

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    <ColorModeScript
      initialColorMode={theme.config.initialColorMode}
      key="chakra-ui-no-flash"
    />,
  ])
}

export const wrapRootElement = ({ element }) => {
  <ChakraProvider
    theme={theme}
    resetCSS={true}
  >
    {element}
  </ChakraProvider>
}