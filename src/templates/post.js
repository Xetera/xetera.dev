import React from "react"
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
import * as AllMarkdownComponents from "../components/Markdown"
import Navbar from "../components/Navbar"
const { overrides: MarkdownOverrides, ...rest } = AllMarkdownComponents
const MarkdownComponents = rest

const EndingText = ({ children }) => (
  <i className="text-blueGray-500 font-semibold">{children}</i>
)

const NavigatorTitle = ({ children, pos }) => (
  <p
    className={`font-bold mb-1 text-blueGray-300 ${
      pos === "left" ? "text-right" : "text-left"
    }`}
  >
    {children}
  </p>
)

const Navigator = ({ pos, link }) => {
  const isLeft = pos === "left"
  const hasLink = Boolean(link)
  return (
    <div
      className={`p-4 ${
        isLeft ? "text-right" : "text-left"
      } m-0 list-none flex-1 ${hasLink && "hover:bg-theme"}`}
    >
      <Link to={link?.fields.slug} rel="prev" className="hover:no-underline">
        <NavigatorTitle pos={pos}>
          {isLeft ? "← Previous" : "Next"} Article {!isLeft && "→"}
        </NavigatorTitle>
        <p className="m-0 text-blueGray-300">
          {link ? (
            <>
              {link.frontmatter.title}
              {link.readingTime}
            </>
          ) : (
            <EndingText pos={pos}>
              {isLeft
                ? "Bruh, you're at the beginning"
                : "This was the last one my dude"}
            </EndingText>
          )}
        </p>
      </Link>
    </div>
  )
}

export default function Post({ data, pageContext, location }) {
  const post = data.mdx
  const { previous, next } = pageContext
  const TagIcon = post.frontmatter?.tags?.length > 1 ? FaTags : FaTag
  const hasTags = post.frontmatter?.tags?.length > 0
  const { imageTop, imageBottom } = post.frontmatter
  const isDraft = post.frontmatter.draft
  return (
    <>
      {post.frontmatter.draft && (
        <Headroom>
          <div className="bg-theme-light max-w-screen z-10 text-blueGray-400">
            <p
              className="py-3 px-4 m-0 m-auto md:text-base text-sm flex items-center"
              style={{ maxWidth: "42rem" }}
            >
              <img
                className="w-5 mr-4"
                src="https://images.emojiterra.com/twitter/v13.0/128px/1f97a.png"
              ></img>{" "}
              You're viewing a draft. This post is not published.
            </p>
          </div>
        </Headroom>
      )}
      <Navbar />
      <Layout
        location={location}
        imageTop={imageTop}
        imageBottom={imageBottom}
        article
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
        <article className="text-gray-200 leading-relaxed lg:leading-loose my-8 md:my-24 px-6">
          <header>
            <span className="flex font-semibold text-base">
              <time
                dateTime={post.frontmatter.date}
                className="text-s block text-gray-400 text-blueGray-500"
              >
                {post.frontmatter.date}
              </time>
              <span className="mx-2 text-gray-700 font-bold">·</span>
              <p className="mb-0 text-blueGray-500">
                {post.fields.readingTime.text}
              </p>
            </span>
            <h1 className="mb-5 md:text-4xl text-3xl font-black">
              {post.frontmatter.title}
            </h1>
            <p className="my-6 text-lg text-gray-400 font-medium">
              {post.frontmatter.description}
            </p>
            {hasTags && (
              <div className="flex items-center mb-5 text-gray-500">
                {/* <TagIcon
                  className="mr-3"
                  title="Tags"
                  style={{ fill: "#4e5c7b" }}
                /> */}
                <Tags
                  tags={post.frontmatter?.tags ?? []}
                  className="flex flex-row align-start flex-shrink"
                  fontClass="lg:text-sm text-xs"
                />
              </div>
            )}
          </header>
          {/* <hr style={{ margin: "3em -50vw" }} className="bg-theme-alt" /> */}
          <section style={{ color: "#bbc0c7" }}>
            <MDXProvider
              components={{
                ...MarkdownComponents,
                ...MarkdownOverrides,
                Toastable,
              }}
            >
              <MDXRenderer className="mb-4">{post.body}</MDXRenderer>
            </MDXProvider>
          </section>
        </article>
        <Popup />
      </Layout>
      {!isDraft && (
        <nav className="border-0 border-t-2 border-theme-light border-solid bg-theme-alt">
          <section className="justify-center flex flex-row p-0 m-0 text-sm w-fullgap-4">
            <Navigator pos="left" link={previous} />
            <Navigator pos="right" link={next} />
          </section>
        </nav>
      )}
    </>
  )
}
export const pageQuery = graphql`
  fragment Cover on File {
    image: childImageSharp {
      fluid(quality: 90, srcSetBreakpoints: [400, 1200, 1920], maxWidth: 1920) {
        ...GatsbyImageSharpFluid_withWebp
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
          src {
            ...Cover
          }
          opacity
        }
        imageBottom {
          src {
            ...Cover
          }
          opacity
        }
      }
    }
  }
`
