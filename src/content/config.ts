// 1. Import utilities from `astro:content`
import { defineCollection, z, image } from "astro:content";
// 2. Define your collection(s)

const blogSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  description: z.string(),
  tags: z.array(z.string()),
  draft: z.boolean().default(false),
  banner: image(),
  // ({ url: z.string(),
  // 	aspectRatio: z.string().regex(/\d+:\d+/),
  // })
  // .optional(),
  imageTop: z
    .object({
      src: z.string(),
    })
    .optional(),
});

export type BlogSchema = z.infer<typeof blogSchema>;

const blogCollection = defineCollection({
  schema: blogSchema,
  /* ... */
});
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  blog: blogCollection,
};
