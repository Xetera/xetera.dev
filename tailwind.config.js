module.exports = {
  purge: {
    options: {
      // I have no idea why tailwind randomly purges my shit
      whitelist: [
        "my-2",
        "mb-3",
        "md:text-lg",
        "lg:text-sm",
        "lg:text-base",
        "text",
        "justify-between",
        "text-red-300",
        "text-blue-300",
        "text-orange-300",
        "text-green-300",
        "text-indigo-300",
      ],
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
