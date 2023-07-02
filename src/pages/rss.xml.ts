import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { routes } from "src/routing";

export async function get(context: APIContext) {
  const blog = await getCollection("blog");
  if (!context.site) {
    throw new Error("Site configuration is missing!");
  }
  return rss({
    title: "Xetera's Blog",
    description: "My humble rambles",
    site: context.site.origin,
    stylesheet: "/pretty-feed-v3.xsl",
    items: blog
      .filter((post) => !post.data.draft)
      .map((post) => ({
        draft: post.data.draft,
        title: post.data.title,
        pubDate: new Date(post.data.date),
        description: post.data.description,
        // customData: post.data.customData,
        // Compute RSS link from post `slug`
        // This example assumes all posts are rendered as `/blog/[slug]` routes
        link: routes.article(post.slug),
      })),
  });
}
