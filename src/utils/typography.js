import Typography from "typography"
import SutroTheme from "typography-theme-sutro"

delete SutroTheme.googleFonts

SutroTheme.overrideThemeStyles = ({ rhythm }, options) => ({
  "p,span,div,time": {
    color: "rgb(233, 233, 233)",
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

const typography = new Typography({
  ...SutroTheme,
  headerFontFamily: [
    "Poppins",
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    "sans-serif",
  ],
  bodyFontFamily: [
    "Noto Sans",
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    "sans-serif",
  ],
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
