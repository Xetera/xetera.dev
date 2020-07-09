import Link from "next/link";

import Layout from "components/Layout";
import Bio from "components/Bio";
import SEO from "components/Seo";
import { getSortedPosts } from "utils/posts";
import Sidebar from "components/Sidebar";

export default function Home({ posts }) {
  return (
    <Layout>
      <SEO title="All posts" />
      <Bio />
      <main className="flex relative flex-col xl:flex-row">
        <div className="xl:w-1/2 xl:absolute xl:right-100 xl:mr-5">
          <Sidebar />
        </div>
        <div className="w-auto">
          {posts.map(({ frontmatter: { title, description, date }, slug }) => (
            <article key={slug}>
              <header>
                <time
                  dateTime={date}
                  className="text-sm block text-gray-500 mb-1"
                >
                  {date}
                </time>
                <h3 className="mb-1 my-0">
                  <Link href={"/post/[slug]"} as={`/post/${slug}`}>
                    <a className="text-3xl text-blue-100 no-underline">
                      {title}
                    </a>
                  </Link>
                </h3>
              </header>
              <section>
                <p className="mb-8">{description}</p>
              </section>
            </article>
          ))}
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
