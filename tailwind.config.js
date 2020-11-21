module.exports = {
  purge: {
    options: {
      // I have no idea why tailwind randomly purges my shit
      safeListPatterns: [/bg-lightBlue/, /^w-/, /^p-/],
      safelist: [
        "my-2",
        "mb-3",
        "mr-3",
        "w-5",
        "w-9",
        "h-9",
        "m-auto",
        "p-4",
        "rounded-full",
        "sm:block",
        "md:text-lg",
        "md:text-4xl",
        "lg:text-sm",
        "text-3xl",
        "lg:text-base",
        "text",
        "text-lg",
        "justify-between",
        "text-cool-blue-100",
        "text-red-300",
        "text-blue-300",
        "text-orange-300",
        "text-green-300",
        "text-indigo-300",
        "bg-lightBlue-900",
      ],
    },
    content: [
      "./**/{content,pages,components,tailwind}/**/*.{js,jsx,ts,tsx,css,mdx}",
    ],
  },
  theme: {
    colors: {
      ...require("tailwindcss/colors"),
      alt: {
        DEFAULT: "rgb(11 26 39)",
      },
    },
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
