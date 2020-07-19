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

export default function Post({ data, pageContext, location }) {
  console.log(data)
  const post = data.mdx
  const { previous, next } = pageContext
  const TagIcon = post.frontmatter?.tags?.length > 1 ? FaTags : FaTag
  const hasTags = post.frontmatter?.tags?.length > 0
  return (
    <>
      <Layout location={location}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />

        <article>
          <header>
            <h1 className="my-0 text-blue-100 lg:text-5xl md:text-4xl text-3xl leading-tight font-black">
              {post.frontmatter.title}
            </h1>
            <p className="my-2 md:text-lg text-gray-400">
              {post.frontmatter.description}
            </p>
            <PostData
              className={hasTags ? "mb-3" : "mb-4"}
              date={post.frontmatter.date}
              readingTime={post.fields.readingTime.text}
            />
            {hasTags && (
              <div className="flex items-center mb-5 text-gray-500">
                <TagIcon className="mr-3 md:text-lg text-sm" title="Tags" />
                <Tags
                  tags={post.frontmatter?.tags ?? []}
                  className="flex flex-row align-start flex-shrink"
                  fontClass="lg:text-sm text-xs"
                />
              </div>
            )}
            <Hr />
          </header>
          <MDXProvider components={{ Toastable, ToastImg }}>
            <MDXRenderer className="mb-4">{post.body}</MDXRenderer>
          </MDXProvider>
        </article>
        <Hr />
        <nav>
          <ul
            className="flex flex-wrap justify-between p-0 m-0 lg:text-base text-sm"
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
        title
        tags
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
