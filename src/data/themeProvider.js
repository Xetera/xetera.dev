import React from "react"

export const defaultTheme = "light"

export const ThemeProvider = React.createContext({ theme: defaultTheme, setTheme: () => {} })