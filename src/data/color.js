export const baseColors = {
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
      light: "#d3399c",
      dark: "hsl(333deg, 100%, 45%)",
    },
    80: {
      light: "hsl(333deg, 100%, 45%)",
      dark: "hsl(333deg, 100%, 45%)",
    },
    20: {
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
  bookBackground: {
    dark: 'rgb(0 0 0 / 0.2)',
    light: 'rgb(255 255 255 / 0.2);'
  },
  discordTextColor: { light: "#2e3338", dark: "#dcddde" },
  highlight: {
    light: "yellow",
    dark: baseColors.brand[100].dark,
  },
}
