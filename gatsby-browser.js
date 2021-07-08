import "typeface-jetbrains-mono"
import React from "react"
import {
  ChakraProvider,
  ColorModeProvider,
  GlobalStyle,
} from "@chakra-ui/react"
import { Global } from "@emotion/react"
import theme from "./src/@chakra-ui/gatsby-plugin/theme"

export const wrapRootElement = ({ element, ...rest }) => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeProvider options={theme.config}>
        <Global
          styles={`
            @font-face {
                font-family: 'Wotfard';
                src: url('/fonts/wotfard/wotfard-regular-webfont.eot');
                src: url('/fonts/wotfard/wotfard-regular-webfont.eot?#iefix') format('embedded-opentype'),
                    url('/fonts/wotfard/wotfard-regular-webfont.woff2') format('woff2'),
                    url('/fonts/wotfard/wotfard-regular-webfont.ttf') format('truetype');
                font-weight: normal;
                font-style: normal;
            }
            @font-face {
                font-family: 'Strawford';
                src: url('/fonts/strawford/strawford-regular-webfont.eot');
                src: url('/fonts/strawford/strawford-regular-webfont.eot?#iefix') format('embedded-opentype'),
                    url('/fonts/strawford/strawford-regular-webfont.woff2') format('woff2'),
                    url('/fonts/strawford/strawford-regular-webfont.woff') format('woff'),
                    url('/fonts/strawford/strawford-regular-webfont.ttf') format('truetype');
                font-weight: normal;
                font-style: normal;
            }
@font-face {
    font-family: 'Jetbrains Mono';
    src: url('/fonts/jetbrains-mono/JetbrainsMono-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;

}
@font-face {
    font-family: 'Geomanist';
    src: url('/fonts/geomanist/geomanist-regular-webfont.eot');
    src: url('/fonts/geomanist/geomanist-regular-webfont.eot?#iefix') format('embedded-opentype'),
         url('/fonts/geomanist/geomanist-regular-webfont.woff2') format('woff2'),
         url('/fonts/geomanist/geomanist-regular-webfont.woff') format('woff'),
         url('/fonts/geomanist/geomanist-regular-webfont.ttf') format('truetype'),
         url('/fonts/geomanist/geomanist-regular-webfont.svg#geomanistregular') format('svg');
    font-weight: normal;
    font-style: normal;

}
          `}
        />
        <GlobalStyle />
        {element}
      </ColorModeProvider>
    </ChakraProvider>
  )
}
