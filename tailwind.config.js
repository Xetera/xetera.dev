module.exports = {
  purge: {
    options: {
      whitelist: ["my-2", "mb-3", "md:text-lg", "lg:text-sm"],
    },
    content: ["./**/{pages,components,tailwind}/**/*.{js,jsx,ts,tsx,css}"],
  },
  theme: {
    extend: {
      minWidth: {
        content: "min-content",
      },
      inset: {
        "100": "100%",
      },
      gridTemplateColumns: {
        body: "200px auto",
      },
    },
  },
  variants: {},
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
