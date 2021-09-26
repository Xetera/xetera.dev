import React from "react"

export const defaultTheme = "dark"

export const ThemeProvider = React.createContext({
  theme: defaultTheme,
  setTheme: () => {},
})

export const LanyardProvider = React.createContext({})
