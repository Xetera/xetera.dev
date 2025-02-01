import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { routes } from "src/routing";

export async function GET(context: APIContext) {
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
			.flatMap((post) => {
				if (post.data.draft) {
					return [];
				}
				return [
					{
						draft: post.data.draft,
						title: post.data.title,
						pubDate: post.data.date,
						description: post.data.description,
						link: routes.article(post.id),
					},
				];
			})
			.sort((a, b) => (a.pubDate < b.pubDate ? 1 : -1)),
	});
}
