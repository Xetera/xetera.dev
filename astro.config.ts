import "dotenv/config";
import { defineConfig, sharpImageService } from "astro/config";
import unocss from "./uno.config";
import mdx from "@astrojs/mdx";
import { remarkReadingTime } from "./markdown-utils";
import react from "@astrojs/react";
import rehypeExternalLinks from "rehype-external-links";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL,
  markdown: {
    remarkPlugins: [
      remarkReadingTime,
      // @ts-expect-error | markdown plugin types are weird
      rehypeSlug,
      // @ts-expect-error | markdown plugin types are weird
      rehypeAutolinkHeadings,
      // @ts-expect-error | markdown plugin types are weird
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
      // @ts-expect-error | the types here are wrong for some reason
      langs: ["ts", "js", "haskell", "rust"],
      // Enable word wrap to prevent horizontal scrolling
      wrap: true,
    },
  },
  integrations: [unocss, mdx(), react()],
  output: "static",
  image: {
    service: sharpImageService()
  },
});
