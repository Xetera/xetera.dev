import React, { useMemo, useState } from "react"
import { ChakraProvider } from "@chakra-ui/provider"
import { localStorageManager } from "@chakra-ui/system"
import { defaultTheme, ThemeProvider } from "../data/providers"
import { createTheme } from "../data/theme"
import { css, Global } from "@emotion/react"
import { domAnimation, LazyMotion } from "framer-motion"

const GlobalStyles = css`
  /*
    This will hide the focus indicator if the element receives focus    via the mouse,
    but it will still show up on keyboard focus.
  */
  .js-focus-visible :focus:not([data-focus-visible-added]) {
     outline: none;
     box-shadow: none;
   }
`;

export const StyleManager = ({ children }) => {
  const [theme, setTheme] = useState(localStorageManager.get() ?? defaultTheme)
  const toggle = previous => {
    const next = previous === "dark" ? "light" : "dark"
    localStorageManager.set(next)
    return next
  }
  const chakraTheme = useMemo(() => createTheme(theme), [theme])
  return (
    <ThemeProvider.Provider value={{ theme, setTheme, toggle }}>
      <ChakraProvider theme={chakraTheme} resetCSS={true}>
        <Global styles={GlobalStyles} />
        <LazyMotion features={domAnimation}>{children}</LazyMotion>
      </ChakraProvider>
    </ThemeProvider.Provider>
  )
}
