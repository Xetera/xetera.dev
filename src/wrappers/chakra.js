import React, { useMemo, useState } from "react"
import { ChakraProvider } from "@chakra-ui/provider"
import { localStorageManager } from "@chakra-ui/system"
import { defaultTheme, ThemeProvider } from "../data/providers"
import { createTheme } from "../data/theme"
import { domAnimation, LazyMotion } from "framer-motion"

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
        <LazyMotion features={domAnimation}>{children}</LazyMotion>
      </ChakraProvider>
    </ThemeProvider.Provider>
  )
}
