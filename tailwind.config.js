module.exports = {
  purge: ["./src/**/*.{js,jsx}", "./content/**/*.{md,mdx}"],
  theme: {
    borderWidth: {
      1: "1px",
    },
    colors: {
      ...require("tailwindcss/colors"),
      theme: {
        dark: "#0a121d",
        DEFAULT: "#0a131f",
        alt: "#0f1a27",
        light: "#15222f",
        lighter: "#202c3d",
      },
      alt: {
        DEFAULT: "#0d1117",
      },
    },
    extend: {
      spacing: {
        inherit: "inherit",
        vh: "100vh",
        "neg-vh": "-100vh",
        "3-quarter-vh": "75vh",
        "neg-3-quarter-vh": "-75vh",
        "half-vh": "50vh",
        "neg-half-vh": "-50vh",
        "quarter-vh": "25vh",
        "neg-quarter-vh": "-25vh",
      },
      minWidth: {
        content: "min-content",
      },
      inset: {
        "100": "100%",
      },
      gridTemplateColumns: {
        body: "250px auto",
      },
    },
  },
  variants: {},
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
