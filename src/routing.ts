export const routes = {
  home: () => "/",
  article(slug: string) {
    return `/article/${slug}`;
  },
};
