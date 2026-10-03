import "dotenv/config";
import { defineConfig, sharpImageService } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import unocss from "./uno.config";
import mdx from "@astrojs/mdx";
import { remarkReadingTime } from "./markdown-utils";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import rehypeExternalLinks from "rehype-external-links";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import { globSync, readFileSync } from "node:fs";
import { basename, dirname, extname } from "node:path";

const draftSlugs = new Set(
  globSync("src/content/blog/**/*.{md,mdx}").flatMap((file) => {
    const frontmatter = readFileSync(file, "utf8").split(/^---$/m)[1] ?? "";
    if (!/^draft:\s*true\s*$/m.test(frontmatter)) return [];
    const name = basename(file, extname(file));
    return [
      frontmatter.match(/^slug:\s*"?([^"\s]+)"?\s*$/m)?.[1] ??
        (name === "index" ? basename(dirname(file)) : name),
    ];
  }),
);

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL,
  compressHTML: true,
  trailingSlash: "never",
  build: {
    format: "file",
  },
  markdown: {
    processor: unified({
      smartypants: false,
      remarkPlugins: [remarkReadingTime],
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, rehypeExternalLinks],
    }),
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
  integrations: [
    unocss,
    mdx(),
    react(),
    sitemap({
      filter: (page) =>
        !draftSlugs.has(new URL(page).pathname.replace(/^\/article\//, "")),
    }),
  ],
  vite: {
    server: {
      watch: {
        ignored: ["**/.devenv/**", "**/.direnv/**", "**/.nix/**"],
        followSymlinks: false,
      },
    },
  },
  output: "static",
  image: {
    service: sharpImageService(),
  },
});
