import { extendTheme } from "@chakra-ui/react"
import mapValues from "lodash/mapValues"

/**
 *
 * @param theme
 * @returns {function(*, *?): *}
 */
const themePicker = theme => (input, key) => {
  const nested = !("dark" in input) && !("light" in input)
  if (nested) {
    return mapValues(input, themePicker(theme))
  }
  const value = input[theme]
  if (!value) {
    throw Error(`Color [${key}] is missing the value ${theme}`)
  }
  return value
}

const injectTheme = (obj, theme) => {
  const pick = themePicker(theme)
  return mapValues(obj, pick)
}

const baseColors = {
  text: {
    100: {
      dark: "#eee",
      light: "#29292c",
    },
    200: {
      light: "#353534",
      dark: "#f5f5f5",
    },
    300: {
      dark: "#9eaab7",
      light: "#454547",
    },
    400: {
      dark: "#718096",
      light: "#38404e",
    },
    500: {
      dark: "#718096",
      light: "#606876",
    },
  },
  bg: {
    100: {
      light: "#f3f3f3",
      dark: "#0f1117",
    },
    300: {
      light: "#e2e9ec",
      dark: "#181b2b",
    },
    500: {
      light: "#E5E7EB",
      dark: "#232735",
    },
  },
  bgPrimary: {
    light: "#f3f3f3",
    dark: "#141621",
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
    dark: "#181c24",
    light: "#e8e8e8",
  },
  borderSubtlePrimary: {
    light: "#dadbde",
    dark: "#1f2231",
  },
  barelyVisible: {
    light: "#9c9c9c21",
    dark: "#1f222a3d",
  },
  brand: {
    100: {
      light: "#a92491",
      dark: "hsl(333deg, 100%, 45%)",
    },
    80: {
      light: "hsl(333deg, 100%, 45%)",
      dark: "hsl(333deg, 100%, 45%)",
    },
  },
  brandSecondary: {
    dark: "#61b3cc",
    light: "#256bc1",
  },
}

export const colors = {
  ...baseColors,
  discord: {
    light: "#36393f",
    dark: "awd",
  },
  brandLight: {
    light: "hsl(333deg, 100%, 55%)",
    dark: "hsl(333deg, 100%, 55%)",
  },
  bgPostHeader: {
    light: baseColors.bgPrimary.light,
    dark: baseColors.bgSecondary.dark,
  },
  // specific colors
  bgPopupShadow: {
    dark: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0px,rgba(0, 0, 0, 0.1) 30%, rgba(0, 0, 0, 0.4) 70% 20px, rgba(0, 0, 0, 0.7))`,
    light: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0px,rgba(0, 0, 0, 0.1) 30%, rgba(0, 0, 0, 0.2) 70% 20px, rgba(0, 0, 0, 0.3))`,
  },
  discordBackground: {
    dark: baseColors.bgSecondary.dark,
    light: "#f9f9f9",
  },
  discordTextColor: { light: "#2e3338", dark: "#dcddde" },
  highlight: {
    light: "yellow",
    dark: baseColors.brand[100].dark,
  },
}

const fontFamily =
  "'Wotfard',-apple-system,'Segoe UI','Roboto','Ubuntu','Cantarell','Noto Sans',sans-serif,'BlinkMacSystemFont','Helvetica Neue','Arial','Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'"

export const transition = "all 0.4s ease-in-out"

const fontSizes = {
  xs: "13px",
  sm: "14px",
  md: "18px",
  lg: "22px",
  xl: "24px",
  "2xl": "32px",
  "3xl": "38px",
  "4xl": "48px",
  "5xl": "56px",
}

export function createTheme(theme) {
  const pick = themePicker(theme)
  return extendTheme({
    config: {
      initialColorMode: "dark",
      useSystemColorMode: false,
    },
    fonts: {
      heading: fontFamily,
      body: fontFamily,
    },
    fontSizes,
    styles: {
      global: {
        ":root": {
          colorScheme: pick({ light: "light", dark: "dark" }),
        },
        ul: {
          listStylePosition: "inside",
        },
        code: {
          display: "inline-flex",
          fontWeight: "bold",
          fontSize: "0.85em",
          background: pick({
            light: colors.bg[300].light,
            dark: "#2b141d",
          }),
          padding: "0 6px",
          lineHeight: "1.7",
          color: pick({
            light: colors.brand[100].light,
            dark: colors.brand[100].dark,
          }),
          borderRadius: "5px",
        },
        ".highlight-line": {
          background: pick({
            light: colors.bgSecondary.light,
            dark: colors.bgSecondary.dark,
          }),
        },
        ".themed-scrollable::-webkit-scrollbar": {
          width: "8px",
        },
        ".themed-scrollable::-webkit-scrollbar-track": {
          width: "8px",
        },
        "*::-webkit-scrollbar-thumb": {
          background: pick(colors.bg[500]),
        },
        ".centered-grid > *": {
          gridColumn: "2 / auto",
        },
        ".blog-post :is(h1, h2, h3, h4, h5, h6) > a": {
          // resetting the link colors of article headings
          color: "inherit",
        },
        ".blog-post > *": {
          fontSize: fontSizes.md,
        },
        a: {
          wordBreak: "break-word",
        },
        ".widebanner > p": {
          marginBottom: 0,
        },
        ".token-line": {
          paddingInlineStart: 3,
          paddingInlineEnd: 3,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        },
        "pre, kbd, samp": {
          fontFamily: `'Jetbrains Mono', ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Fira Mono", "Droid Sans Mono", "Courier New", monospace`,
        },
        // We don't want the last element of blockquotes to push the quote border down with a margin
        ".blog-post blockquote::before, .blog-post blockquote::after": {
          width: "3rem",
          display: "block",
          borderTop: `1px solid ${pick(colors.text[500])}`,
          opacity: 0.4,
          content: '""',
          margin: "0 auto",
        },
        ".blog-post blockquote > p": {
          margin: "3rem 0",
          fontWeight: "medium",
          fontSize: "inherit",
        },
        body: {
          lineBreak: "auto",
          transition,
          color: pick(colors.text[300]),
          background: pick({
            light: colors.bg[100].light,
            dark: colors.bg[100].dark,
          }),
        },
        "::selection": {
          backgroundColor: pick({
            light: "#ddbed8",
            dark: "#1f242e",
          }),
        },
      },
    },
    components: {
      Link: {
        baseStyle: {
          color: pick({
            light: colors.brandSecondary.light,
            dark: colors.brandSecondary.dark,
          }),
        },
      },
      // Heading: {
      //   baseStyle: props => ({
      //     color: "text.100",
      //   }),
      // },
    },
    // colors
    colors: injectTheme(colors, theme),
  })
}
