import { getCollection } from "astro:content";

export async function getAllContent() {
  const posts = await getCollection("blog");
  return posts
    .flatMap((post) => (post.data.draft ? [] : [post]))
    .sort((a, b) => (a.data.date < b.data.date ? 1 : -1));
}
