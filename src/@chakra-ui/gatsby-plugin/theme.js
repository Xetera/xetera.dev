import { extendTheme } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"

export const colors = {
  discord: {
    dark: "#36393f",
    light: "",
  },
  textPrimary: {
    light: "gray.900",
    dark: "gray.50",
  },
  textSecondary: {
    light: "gray.700",
    dark: "gray.300",
  },
  textTertiary: {
    light: "#38404e",
    dark: "gray.400",
  },
  bgPrimary: {
    light: "#f3f3f3",
    dark: "gray.900",
  },
  bgSecondary: {
    light: "#e2e9ec",
    dark: "#181b2b",
  },
  bgTertiary: {
    light: "gray.200",
    dark: "#232735",
  },
  bgBrand: {
    light: "#f5e5ec",
    dark: "hsl(333deg 52% 14%)",
  },
  borderSubtle: {
    dark: "#1e2131",
    light: "#e8e8e8",
  },
  borderSubtlePrimary: {
    light: "#dadbde",
    dark: "#1f2231",
  },
  text: {
    primary: "gray.50",
    secondary: "gray.300",
  },
  brand: {
    light: "hsl(333deg, 100%, 45%)",
    dark: "hsl(333deg, 100%, 45%)",
  },
  brandSecondary: {
    dark: "#62daff",
    light: "#256bc1",
  },
  brandBackground: {},
  brandLight: {
    dark: "hsl(333deg, 100%, 55%)",
    dark: "hsl(333deg, 100%, 55%)",
  },
}

const fontFamily =
  "'Wotfard',-apple-system,'Segoe UI','Roboto','Ubuntu','Cantarell','Noto Sans',sans-serif,'BlinkMacSystemFont','Helvetica Neue','Arial','Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'"

function makeLayer(name, variants) {
  return {
    [name]: variants[1],
    _light: {
      [name]: variants[0],
    },
  }
}

export const transition = "all 0.4s ease-in-out"

export default extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  fonts: {
    heading: fontFamily,
    body: fontFamily,
  },
  layerStyles: {
    discordBackground: makeLayer("background", [
      "#f9f9f9",
      colors.bgSecondary.dark,
    ]),
    discordTextColor: makeLayer("color", ["#2e3338", "#dcddde"]),
    borderSubtle: makeLayer("borderColor", [
      colors.borderSubtle.light,
      colors.borderSubtle.dark,
    ]),
    borderSubtlePrimary: makeLayer("borderColor", [
      colors.borderSubtlePrimary.light,
      colors.borderSubtlePrimary.dark,
    ]),
    textBrand: makeLayer("color", [colors.brand.light, colors.brand.dark]),
    bgBrand: makeLayer("background", [
      colors.bgBrand.light,
      colors.bgBrand.dark,
    ]),
    textBrandLight: makeLayer("color", [
      colors.brandLight.light,
      colors.brandLight.dark,
    ]),
    bgSubtle: makeLayer("background", ["gray.100", "#1e2131"]),
    bgPrimary: makeLayer("background", [
      colors.bgPrimary.light,
      colors.bgPrimary.dark,
    ]),
    bgSecondary: makeLayer("background", [
      colors.bgSecondary.light,
      colors.bgSecondary.dark,
    ]),
    bgTertiary: makeLayer("background", [
      colors.bgTertiary.light,
      colors.bgTertiary.dark,
    ]),
    textPrimary: makeLayer("color", [
      colors.textPrimary.light,
      colors.textPrimary.dark,
    ]),
    textSecondary: makeLayer("color", [
      colors.textSecondary.light,
      colors.textSecondary.dark,
    ]),
    textTertiary: makeLayer("color", [
      colors.textTertiary.light,
      colors.textTertiary.dark,
    ]),
  },
  fontSizes: {
    xs: "13px",
    sm: "14px",
    md: "16px",
    lg: "19px",
    xl: "24px",
    "2xl": "32px",
    "3xl": "38px",
    "4xl": "48px",
    "5xl": "56px",
  },
  styles: {
    global: props => ({
      code: {
        color: mode(colors.brand.light, colors.brand.dark)(props),
        background: mode(
          colors.bgSecondary.light,
          colors.bgSecondary.dark
        )(props),
        fontSize: "0.9em",
        fontFamily: fontFamily,
        fontStyle: "italic",
        transition,
        borderRadius: "5px",
        padding: "1px 5px",
      },
      ".blog-post :is(h1, h2, h3, h4, h5, h6) > a": {
        // resetting the link colors of article headings
        color: "inherit",
      },
      a: {
        wordBreak: "break-word",
      },
      ".widebanner > p": {
        marginBottom: 0,
      },
      ".token-line": {
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      },
      "pre, kbd, samp": {
        fontFamily: `'Jetbrains Mono', ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Fira Mono", "Droid Sans Mono", "Courier New", monospace`,
      },
      body: {
        lineBreak: "auto",
        transition,
        color: mode("gray.700", "gray.300")(props),
        background: mode(colors.bgPrimary.light, "#141621")(props),
      },
    }),
  },
  components: {
    Link: {
      baseStyle: props => ({
        color: mode(
          colors.brandSecondary.light,
          colors.brandSecondary.dark
        )(props),
      }),
    },
    Heading: {
      baseStyle: props => ({
        color: mode(colors.textPrimary.light, colors.textPrimary.dark)(props),
      }),
    },
    Text: {
      baseStyle: props => ({
        // color: mode(colors.textPrimary.light, colors.textPrimary.dark)(props),
        lineHeight: "1.7",
      }),
    },
  },
  colors,
})
