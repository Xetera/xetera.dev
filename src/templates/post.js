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

const EndingText = ({ children }) => (
  <i className="text-blueGray-500 font-semibold">{children}</i>
)

const NavigatorTitle = ({ children, pos }) => (
  <p className={`font-semibold mb-1 font-blueGray-500 text-${pos}`}>
    {children}
  </p>
)

export default function Post({ data, pageContext, location }) {
  const post = data.mdx
  console.log(post.frontmatter)
  const { previous, next } = pageContext
  console.log(previous)
  const TagIcon = post.frontmatter?.tags?.length > 1 ? FaTags : FaTag
  const hasTags = post.frontmatter?.tags?.length > 0
  return (
    <>
      {post.frontmatter.draft && (
        <Headroom>
          <div className="bg-theme-light max-w-screen">
            <p
              className="py-3 px-4 m-0 m-auto md:text-base text-sm flex items-center"
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
      <Layout
        location={location}
        imageTop={post.frontmatter.imageTop?.image.fluid}
        imageBottom={post.frontmatter.imageBottom?.image.fluid}
      >
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
        <Popup />
      </Layout>
      <nav className="p-4 flex items-center justify-center border-0 border-t-2 border-theme-light border-solid">
        <div className="max-w-screen-lg margin-auto">
          <ul className="flex flex-wrap justify-between p-0 m-0 text-sm w-full">
            <li className="m-0 mr-2 list-none">
              <NavigatorTitle pos="right">Previous Article</NavigatorTitle>
              <p className="text-right m-0">
                {previous ? (
                  <>
                    <Link to={previous.fields.slug} rel="prev">
                      {previous.frontmatter.title}
                    </Link>
                    {previous.readingTime}
                  </>
                ) : (
                  <EndingText>Bruh, you're at the beginning</EndingText>
                )}
              </p>
            </li>
            <li className="list-none m-0 ml-2">
              <NavigatorTitle pos="left">Next Article</NavigatorTitle>
              {next ? (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title}
                </Link>
              ) : (
                <EndingText>This was the last one my dude</EndingText>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}
export const pageQuery = graphql`
  fragment Cover on File {
    image: childImageSharp {
      fluid(quality: 90, maxWidth: 1920) {
        ...GatsbyImageSharpFluid
      }
    }
  }
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
        imageTop {
          ...Cover
        }
        imageBottom {
          ...Cover
        }
      }
    }
  }
`
