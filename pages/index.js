import Link from "next/link";

import Layout, { Hr } from "components/Layout";
import Bio from "components/Bio";
import SEO from "components/Seo";
import { getSortedPosts } from "utils/posts";
import Sidebar from "components/Sidebar";

export default function Home({ posts }) {
  return (
    <Layout>
      <SEO title="All posts" />
      <Bio />
      <Hr />
      <main className="flex relative flex-col xl:flex-row">
        <div className="xl:w-1/4 xl:absolute xl:right-100 xl:mr-5">
          <Sidebar />
        </div>
        <div className="w-auto">
          {posts.map(
            ({ frontmatter: { title, description, date, readTime }, slug }) => (
              <article key={slug} className="mb-8">
                <header>
                  <div className="flex items-baseline mb-1">
                    <time
                      dateTime={date}
                      className="text-base block text-gray-500 mr-3"
                    >
                      {date}
                    </time>
                    <p className="text-s m-0 text-gray-600">{readTime}</p>
                  </div>
                  <h3 className="mb-1 my-0">
                    <Link href={"/post/[slug]"} as={`/post/${slug}`}>
                      <a className="text-3xl text-blue-100 no-underline">
                        {title}
                      </a>
                    </Link>
                  </h3>
                </header>
                <section>
                  <p className="m-0">{description}</p>
                </section>
              </article>
            )
          )}
        </div>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = getSortedPosts();

  return {
    props: {
      posts,
    },
  };
}
