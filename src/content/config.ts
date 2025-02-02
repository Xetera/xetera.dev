import { defineCollection, z, type ImageFunction } from "astro:content";
import { glob } from "astro/loaders";

const blogSchema = ({ image }: { image: ImageFunction }) => {
	return z.object({
		title: z.string(),
		date: z.coerce.date(),
		description: z.string(),
		tags: z.array(z.string()),
		draft: z.boolean().default(false),
		banner: image().optional(),
		imageTop: z
			.object({
				src: z.string(),
			})
			.optional(),
	});
};

export type BlogSchema = z.infer<ReturnType<typeof blogSchema>>;

const blogCollection = defineCollection({
	loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
	schema: ({ image }) => blogSchema({ image }),
});

const shortsCollection = defineCollection({
	loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/shorts" }),
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		draft: z.boolean().default(false),
	}),
});

export const collections = {
	blog: blogCollection,
	shorts: shortsCollection,
};
