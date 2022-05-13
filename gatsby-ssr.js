import React from "react"
import "typeface-sriracha"
import "typeface-jetbrains-mono"
import "./static/fonts/wotfard/stylesheet.css"
import { wrapRootElement } from "./src/wrappers/gatsby"
import { defaultTheme } from "./src/data/providers"
import { ColorModeScript } from "@chakra-ui/color-mode"

export const onRenderBody = ({ setPreBodyComponents, setHtmlAttributes }) => {
  setPreBodyComponents([
    <ColorModeScript
      initialColorMode={defaultTheme}
      key="chakra-ui-no-flash"
    />,
  ])
}

export { wrapRootElement }
