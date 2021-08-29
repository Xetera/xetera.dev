import React from "react"
import theme from "../@chakra-ui/gatsby-plugin/theme"
import { ChakraProvider, Box } from "@chakra-ui/react"
import { Player } from "../components/Player/Player"

export const wrapRootElement = ({ element }) => {
  // keeping it below to make sure mobile doesn't look wonky
  return (
    <ChakraProvider theme={theme} resetCSS={true}>
      <Player />
      {element}
    </ChakraProvider>
  )
}
