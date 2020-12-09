import React from "react"
import { Link, graphql } from "gatsby"
import Bio from "../components/Bio"
import PostData, { Tags } from "../components/PostShared"
import Layout, { Hr } from "../components/Layout"
import SEO from "../components/Seo"

import Sidebar from "../components/Sidebar"

const BlogIndex = ({ data, location }) => {
  const posts = data.allMdx.edges

  return (
    <Layout location={location}>
      <SEO title="Home" />
      <Bio />
      <main className="flex relative xl:flex-row flex-col-reverse">
        <div className="xl:w-1/4 xl:absolute xl:right-100 xl:mr-5 h-full mb-6">
          <Sidebar />
        </div>
        <div className="w-auto grid mb-6" style={{ gap: "2.4rem" }}>
          {posts.map(({ node }) => {
            const title = node.frontmatter.title ?? node.fields.slug
            return (
              <article key={title}>
                <header>
                  <PostData
                    className="mb-1 text-sm"
                    date={node.frontmatter.date}
                    readingTime={node.fields.readingTime.text}
                  />
                  <h3 className="mb-1 my-0">
                    <Link
                      to={node.fields.slug}
                      className="text-xl text-gray-200 no-underline font-bold"
                    >
                      {title}
                    </Link>
                  </h3>
                </header>
                <section>
                  <p className="mb-2 font-medium text-gray-400 text-base">
                    {node.frontmatter.description}
                  </p>
                  <Tags
                    tags={node.frontmatter?.tags ?? []}
                    fontClass="text-sm"
                  />
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
    cover: file(name: { regex: "/frontpage/" }) {
      image: childImageSharp {
        fluid(quality: 90, maxWidth: 1920) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
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
            tags
          }
        }
      }
    }
  }
`
