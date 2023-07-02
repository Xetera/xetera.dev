import "dotenv/config";
import { defineConfig } from "astro/config";
import unocss from "./uno.config.js";
import mdx from "@astrojs/mdx";
import { remarkReadingTime } from "./markdown-utils.mjs";
import UnoCss from "@unocss/astro";
import prefetch from "@astrojs/prefetch";
import react from "@astrojs/react";
import rehypeExternalLinks from "rehype-external-links";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

// https://astro.build/config
export default defineConfig({
  experimental: { assets: true },
  site: process.env.SITE_URL,
  markdown: {
    remarkPlugins: [
      remarkReadingTime,
      rehypeSlug,
      rehypeAutolinkHeadings,
      rehypeExternalLinks,
    ],
    extendDefaultPlugins: true,
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: "css-variables",
      // theme: 'min-light',
      // Add custom languages
      // Note: Shiki has countless langs built-in, including .astro!
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md
      langs: ["ts", "js", "haskell", "rust"],
      // Enable word wrap to prevent horizontal scrolling
      wrap: true,
    },
  },
  integrations: [unocss, mdx(), prefetch({ throttle: 3 }), react()],
  output: "static",
  // adapter: vercel(),
  image: {
    service: { entrypoint: "astro/assets/services/sharp" },
  },
});
