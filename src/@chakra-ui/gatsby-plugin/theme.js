import "@fontsource/inter/300.css"
import "@fontsource/inter/400.css"
import "@fontsource/inter/500.css"
import "@fontsource/inter/600.css"
import "@fontsource/inter/700.css"
import "@fontsource/inter/900.css"

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
    light: "gray.600",
    dark: "gray.400",
  },
  borderSubtle: {
    dark: "#1e2131",
    light: "gray.100",
  },
  text: {
    primary: "gray.50",
    secondary: "gray.300",
  },
}

export const themedColors = {
  brand: {
    dark: "#EAE3A8",
    light: "#256bc1",
  },
}

const fontFamily =
  "Inter, 'system-ui',-apple-system,'Segoe UI','Roboto','Ubuntu','Cantarell','Noto Sans',sans-serif,'BlinkMacSystemFont','Helvetica Neue','Arial','Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'"

function makeLayer(name, variants) {
  return {
    [name]: variants[0],
    _dark: {
      [name]: variants[1],
    },
  }
}

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
    discordBackground: makeLayer("background", ["#fbfbfb", "gray.800"]),
    discordTextColor: makeLayer("color", ["#2e3338", "#dcddde"]),
    bgSubtle: {
      background: "gray.100",
      _dark: {
        background: "#1e2131",
      },
    },
    borderSubtle: {
      borderColor: "gray.100",
      _dark: {
        borderColor: "#1e2131",
      },
    },
    bgPrimary: {
      background: "white",
      _dark: {
        background: "gray.900",
      },
    },
    bgSecondary: {
      background: "gray.100",
      _dark: {
        background: "#1b1d29",
      },
    },
    bgTertiary: {
      background: "gray.200",
      _dark: {
        background: "#232735",
      },
    },
    textPrimary: {
      color: colors.textPrimary.light,
      _dark: {
        color: colors.textPrimary.dark,
      },
    },
    textSecondary: {
      color: colors.textSecondary.light,
      _dark: {
        color: colors.textSecondary.dark,
      },
    },
    textTertiary: {
      color: colors.textTertiary.light,
      _dark: {
        color: colors.textTertiary.dark,
      },
    },
  },
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "24px",
    "2xl": "32px",
    "3xl": "38px",
    "4xl": "48px",
    "5xl": "56px",
  },
  styles: {
    global: props => ({
      code: {
        borderColor: mode(
          colors.borderSubtle.light,
          colors.borderSubtle.dark
        )(props),
        borderWidth: "1px",
        padding: "1px 5px",
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
      "pre, code, kbd, samp": {
        fontFamily: `ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Fira Mono", "Droid Sans Mono", "Courier New", monospace`,
      },
      body: {
        lineBreak: "auto",
        color: mode("gray.700", "gray.300")(props),
        background: mode("white", "gray.900")(props),
      },
    }),
  },
  components: {
    Link: {
      baseStyle: props => ({
        color: mode(themedColors.brand.light, themedColors.brand.dark)(props),
        transition: "all 0.4s",
      }),
    },
    Heading: {
      baseStyle: props => ({
        color: mode(colors.textPrimary.light, colors.textPrimary.dark)(props),
        transition: "all 0.4s",
      }),
    },
    Text: {
      baseStyle: props => ({
        color: mode(
          colors.textSecondary.light,
          colors.textSecondary.dark
        )(props),
        lineHeight: "1.7",
        transition: "all 0.4s",
      }),
    },
  },
  colors,
})
