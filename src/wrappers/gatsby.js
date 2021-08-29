import React from "react"
import theme from "../@chakra-ui/gatsby-plugin/theme"
import { ChakraProvider } from "@chakra-ui/react"
import { Player } from "../components/Player/Player"

export const wrapRootElement = ({ element }) => {
  return (
    <ChakraProvider theme={theme} resetCSS={true}>
      <Player />
      {element}
    </ChakraProvider>
  )
}
