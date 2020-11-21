import React from "react"
import { Hr } from "../components/Layout"
import Layout from "../components/Layout"
import { Link, graphql } from "gatsby"
import PostData, { Tags } from "../components/PostShared"
import Popup from "../components/Popup"
import SEO from "../components/Seo"
import { FaTag, FaTags } from "react-icons/fa"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Toastable, ToastImg } from "../components/Popup"
import { MDXProvider } from "@mdx-js/react"
import Headroom from "react-headroom"

export default function Post({ data, pageContext, location }) {
  const post = data.mdx
  const { previous, next } = pageContext
  const TagIcon = post.frontmatter?.tags?.length > 1 ? FaTags : FaTag
  const hasTags = post.frontmatter?.tags?.length > 0
  console.log(post.frontmatter)
  return (
    <>
      {post.frontmatter.draft && (
        <Headroom>
          <div className="bg-lightBlue-900 max-w-screen">
            <p
              className="text-lightBlue-400 py-3 px-4 m-0 m-auto md:text-base text-sm flex items-center"
              style={{ maxWidth: "42rem" }}
            >
              <img
                className="w-5 mr-4"
                src="https://images.emojiterra.com/twitter/v13.0/512px/1f97a.png"
              ></img>{" "}
              You're viewing a draft. This post is not published.
            </p>
          </div>
        </Headroom>
      )}
      <Layout location={location}>
        <style
          dangerouslySetInnerHTML={{
            __html: ` #gatsby-focus-wrapper { overflow: hidden; } `,
          }}
        />
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <article className="text-gray-200">
          <header>
            <h1 className="mb-5 md:text-4xl text-3xl font-black">
              {post.frontmatter.title}
            </h1>
            <p className="my-2 text-lg text-gray-400">
              {post.frontmatter.description}
            </p>
            <PostData
              className={hasTags ? "mb-3" : "mb-4"}
              date={post.frontmatter.date}
              readingTime={post.fields.readingTime.text}
            />
            {hasTags && (
              <div className="flex items-center mb-5 text-gray-500">
                <TagIcon className="mr-3" title="Tags" />
                <Tags
                  tags={post.frontmatter?.tags ?? []}
                  className="flex flex-row align-start flex-shrink"
                  fontClass="lg:text-sm text-xs"
                />
              </div>
            )}
          </header>
          <section>
            <MDXProvider components={{ Toastable, ToastImg }}>
              <MDXRenderer className="mb-4">{post.body}</MDXRenderer>
            </MDXProvider>
          </section>
        </article>
        <nav>
          <ul
            className="flex flex-wrap justify-between p-0 m-0 text-sm"
            style={{ listStyle: `none` }}
          >
            <li style={{ listStyle: "none" }}>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li style={{ listStyle: "none" }}>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
        <Popup />
      </Layout>
    </>
  )
}
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      fields {
        readingTime {
          text
        }
      }
      frontmatter {
        draft
        title
        tags
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
