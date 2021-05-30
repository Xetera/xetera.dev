// custom typefaces
import "typeface-jetbrains-mono"
// import "prismjs/plugins/line-numbers/prism-line-numbers.css"
// import "prism-themes/themes/prism-material-oceanic.css"
import React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import theme from "./src/@chakra-ui/gatsby-plugin/theme"

export const wrapRootElement = ({ element, ...rest }) => {
  console.log({ rest })
  return <ChakraProvider theme={theme}>{element}</ChakraProvider>
}
