import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/Bio"
import PostData from "../components/PostShared"
import Layout, { Hr } from "../components/Layout"
import SEO from "../components/Seo"

import Sidebar from "../components/Sidebar"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location}>
      <SEO title="Home" />
      <Bio />
      <Hr />
      <main className="flex relative flex-col xl:flex-row">
        <div className="xl:w-1/4 xl:absolute xl:right-100 xl:mr-5">
          <Sidebar />
        </div>
        <div className="w-auto">
          {posts.map(({ node }) => {
            const title = node.frontmatter.title ?? node.fields.slug
            return (
              <article key={title} className="mb-8">
                <header>
                  <PostData
                    className="mb-1"
                    date={node.frontmatter.date}
                    readingTime={node.fields.readingTime.text}
                  />
                  <h3 className="mb-1 my-0">
                    <Link
                      to={node.fields.slug}
                      className="text-2xl text-blue-100 no-underline font-bold"
                    >
                      {title}
                    </Link>
                  </h3>
                </header>
                <section>
                  <p className="m-0 text-gray-400">
                    {node.frontmatter.description}
                  </p>
                </section>
              </article>
            )
          })}
        </div>
      </main>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            readingTime {
              text
            }
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
