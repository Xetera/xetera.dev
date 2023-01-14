import React from "react"
import "typeface-sriracha"
import "./static/fonts/wotfard/stylesheet.css"
import { wrapRootElement } from "./src/wrappers/gatsby"
import { defaultTheme } from "./src/data/providers"
import { ColorModeScript } from "@chakra-ui/color-mode"
import { DomainPreconnect, FontPreload } from "./src/components/Head"

export const onRenderBody = ({ setPreBodyComponents, setHeadComponents }) => {
  setHeadComponents([
    <DomainPreconnect key="domain-preload" />,
    <FontPreload key="font-preloader" />,
  ])
  setPreBodyComponents([
    <ColorModeScript
      initialColorMode={defaultTheme}
      key="chakra-ui-no-flash"
    />,
  ])
}

export { wrapRootElement }
