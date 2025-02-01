import { defineCollection, z } from "astro:content";

type Schema = Parameters<typeof defineCollection>[0]["schema"];

const blogSchema: Schema = ({ image }) => {
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
  type: "content",
  schema: ({ image }) => blogSchema({ image }),
  /* ... */
});
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  blog: blogCollection,
};
