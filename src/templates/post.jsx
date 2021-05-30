import React from "react"
import {
  Hr,
  Layout,
  LayoutContent,
  layoutContentPadding,
} from "../components/Layout"
import { Link as GatsbyLink, graphql } from "gatsby"
import PostData, { Tags } from "../components/PostShared"
import Popup from "../components/Popup"
import SEO from "../components/Seo"
import { FaTag, FaTags } from "react-icons/fa"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Toastable, ToastImg } from "../components/Popup"
import { MDXProvider } from "@mdx-js/react"
import Headroom from "react-headroom"
import * as AllMarkdownComponents from "../components/Markdown"
import * as Chakra from "@chakra-ui/layout"
import { useBrandColor } from "../hooks/color"
import { Image } from "@chakra-ui/image"
import GatsbyImage from "gatsby-image"
const { overrides: MarkdownOverrides, ...rest } = AllMarkdownComponents
const MarkdownComponents = rest
const { Box, Flex, Grid, Heading, Link, Stack, Text } = Chakra

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
      <GatsbyLink
        to={link?.fields.slug}
        rel="prev"
        className="hover:no-underline"
      >
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
      </GatsbyLink>
    </div>
  )
}

function makeHeader(type) {
  return ({ children, ...props }) => (
    <Heading as={type} mb={4} fontSize="2xl" {...props}>
      {children}
    </Heading>
  )
}

export const maxWidth = "49rem"

export default function Post({ data, pageContext, location }) {
  const post = data.mdx
  const { previous, next, ogImage } = pageContext
  const brand = useBrandColor()
  const TagIcon = post.frontmatter?.tags?.length > 1 ? FaTags : FaTag
  const hasTags = post.frontmatter?.tags?.length > 0
  const { imageTop, imageBottom } = post.frontmatter
  const isDraft = post.frontmatter.draft
  return (
    <>
      <Layout imageTop={imageTop} imageBottom={imageBottom} article>
        <LayoutContent mx="auto" maxWidth={maxWidth} mt={[8, 12, 24]}>
          <SEO
            title={post.frontmatter.title}
            description={post.frontmatter.description || post.excerpt}
            image={ogImage}
          />
          <style
            dangerouslySetInnerHTML={{
              __html: ` #gatsby-focus-wrapper { overflow: hidden; } `,
            }}
          />
          {post.frontmatter.draft && (
            <Box>
              <Flex
                zIndex={10}
                width="100%"
                mx="auto"
                flexFlow="row"
                maxWidth={maxWidth}
              >
                <Image
                  mr={4}
                  width="30px"
                  height="30px"
                  src="https://images.emojiterra.com/twitter/v13.0/128px/1f97a.png"
                />
                <Text color={brand} fontWeight="semibold" fontSize="sm">
                  You're viewing a draft. This post is not published.
                </Text>
              </Flex>
            </Box>
          )}
          <Box
            as="article"
            className="text-gray-200 leading-relaxed lg:leading-loose my-8 md:my-24 px-6"
          >
            <Grid as="header" gap={2}>
              <Flex alignItems="center" layerStyle="textTertiary">
                <Text
                  as="time"
                  dateTime={post.frontmatter.date}
                  color="gray.500"
                >
                  {post.frontmatter.date}
                </Text>
                <Box mx="10px">·</Box>
                <Text color="gray.500">{post.fields.readingTime.text}</Text>
              </Flex>
              <Heading
                as="h1"
                fontSize={["xl", "2xl", "3xl"]}
                lineHeight="1.4"
                fontWeight="black"
              >
                {post.frontmatter.title}
              </Heading>
              <Text
                fontSize={["lg", "xl"]}
                fontWeight="medium"
                lineHeight="1.4"
              >
                {post.frontmatter.description}
              </Text>
              {imageTop && (
                <Box my={3} borderRadius="sm" overflow="hidden">
                  <GatsbyImage fluid={imageTop.src.image.fluid} />
                </Box>
              )}
              <Hr />
              <Box as="section" fontSize="lg" lineHeight="1.8">
                <MDXProvider
                  components={{
                    ...MarkdownComponents,
                    ...MarkdownOverrides,
                    ...Chakra,
                    ChakraImage: Image,
                    Toastable,
                    Hr,
                    a: ({ children, ...props }) => (
                      <Link color={brand} {...props}>
                        {children}
                      </Link>
                    ),
                    Text,
                    h6: makeHeader("h6"),
                    h5: makeHeader("h5"),
                    h4: makeHeader("h4"),
                    h3: makeHeader("h3"),
                    h2: makeHeader("h2"),
                    h1: makeHeader("h1"),
                    blockquote: ({ children, ...props }) => (
                      <Box
                        as="blockquote"
                        layerStyle="borderSubtle"
                        // borderColor="text.secondary"
                        borderLeftWidth="2px"
                        borderLeft="solid"
                        paddingInlineStart={4}
                        {...props}
                      >
                        {children}
                      </Box>
                    ),
                    p: ({ children, ...props }) => (
                      <Text
                        as="p"
                        fontSize="lg"
                        // lineHeight="1.8"
                        mb={6}
                        {...props}
                      >
                        {children}
                      </Text>
                    ),
                  }}
                >
                  <MDXRenderer className="mb-4">{post.body}</MDXRenderer>
                </MDXProvider>
              </Box>
            </Grid>
          </Box>
          <Popup />
        </LayoutContent>
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
