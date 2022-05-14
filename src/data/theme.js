import { extendTheme } from "@chakra-ui/react"
import mapValues from "lodash/mapValues"
import { colors } from "./color"

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
