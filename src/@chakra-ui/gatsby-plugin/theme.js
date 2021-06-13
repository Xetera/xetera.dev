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
      background: "gray.50",
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
      ".widebanner > p": {
        marginBottom: 0,
      },
      body: {
        color: mode("gray.700", "gray.300")(props),
        background: mode("gray.50", "gray.900")(props),
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
        lineHeight: "1.8",
        transition: "all 0.4s",
      }),
    },
  },
  colors,
})
