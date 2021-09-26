import React, { useMemo, useState } from "react"
import { ChakraProvider, localStorageManager } from "@chakra-ui/react"
import { defaultTheme, ThemeProvider } from "../data/providers"
import { createTheme } from "../data/theme"

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
        {children}
      </ChakraProvider>
    </ThemeProvider.Provider>
  )
}
