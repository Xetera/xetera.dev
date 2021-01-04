import Typography from "typography"
import SutroTheme from "typography-theme-sutro"

delete SutroTheme.googleFonts

SutroTheme.overrideThemeStyles = ({ rhythm }, options) => ({
  "*": {
    fontWeight: "400",
  },
  a: {
    color: "rgb(81, 196, 211)",
  },
  "h1,h2,h3,h4,h5,h6": {
    marginTop: rhythm(1 / 2),
  },
  h1: {
    fontWeight: 900,
    letterSpacing: "0px",
  },
})
SutroTheme.scaleRatio = 5 / 2

const fontStack = [
  "system-ui",
  "-apple-system",
  "Segoe UI",
  "Roboto",
  "Ubuntu",
  "Cantarell",
  "Noto Sans",
  "sans-serif",
  "BlinkMacSystemFont",
  "Helvetica Neue",
  "Arial",
  "Apple Color Emoji",
  "Segoe UI Emoji",
  "Segoe UI Symbol",
  "Noto Color Emoji",
]

const typography = new Typography({
  ...SutroTheme,
  headerFontFamily: fontStack,
  bodyFontFamily: fontStack,
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
