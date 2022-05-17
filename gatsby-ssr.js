import React from "react"
import "typeface-sriracha"
import "./static/fonts/wotfard/stylesheet.css"
import { wrapRootElement } from "./src/wrappers/gatsby"
import { defaultTheme } from "./src/data/providers"
import { ColorModeScript } from "@chakra-ui/color-mode"
import { FontPreload } from "./src/components/Fonts"

export const onRenderBody = ({ setPreBodyComponents, setHeadComponents }) => {
  setHeadComponents([<FontPreload key="font-preloader" />])
  setPreBodyComponents([
    <ColorModeScript
      initialColorMode={defaultTheme}
      key="chakra-ui-no-flash"
    />,
  ])
}

export { wrapRootElement }
