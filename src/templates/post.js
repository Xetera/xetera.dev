import React from "react"
import { Hr } from "../components/Layout"
import Layout from "../components/Layout"
import { Link } from "gatsby"
import PostData from "../components/PostShared"
import SEO from "../components/Seo"

export default function Post({ data, pageContext, location }) {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext
  return (
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
            className="mb-5"
            date={post.frontmatter.date}
            readingTime={post.fields.readingTime.text}
          />
          <Hr />
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          className="mb-4"
        />
      </article>
      <Hr />
      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
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
    </Layout>
  )
}
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        readingTime {
          text
        }
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
