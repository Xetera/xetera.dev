import React from "react"

export const defaultTheme = "dark"

export const ThemeProvider = React.createContext({
  theme: defaultTheme,
  setTheme: () => {},
})

export const ToastContext = React.createContext({
  jsx: null,
  setJsx: null,
})

export const LanyardProvider = React.createContext({})
