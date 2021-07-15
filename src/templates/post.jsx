import React from "react"
import {
  Hr,
  Layout,
  LayoutContent,
  layoutContentPadding,
} from "../components/Layout"
import { Link as GatsbyLink, graphql } from "gatsby"
import Popup from "../components/Popup"
import SEO from "../components/Seo"
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import PopupPortal, { Toastable } from "../components/Popup"
import { RoughNotation } from "react-rough-notation"
import { MDXProvider } from "@mdx-js/react"
import * as AllMarkdownComponents from "../components/Markdown"
import * as Chakra from "@chakra-ui/layout"
import * as ChakraReact from "@chakra-ui/react"
import { useBrandColor, useBrandSecondaryColor } from "../hooks/color"
import { Image } from "@chakra-ui/image"
import { Table, Td, Th, Tr } from "@chakra-ui/table"
import { Text, useColorModeValue } from "@chakra-ui/react"
import { colors, transition } from "../@chakra-ui/gatsby-plugin/theme"
import { maxWidth } from "../shared"
const { overrides: MarkdownOverrides, ...rest } = AllMarkdownComponents
const MarkdownComponents = rest
const { Box, Flex, Grid, Heading, Link } = Chakra

const Navigator = ({ pos, link }) => {
  const isLeft = pos === "left"

  const data = (
    <Box
      p={4}
      m={0}
      transition={transition}
      height="100%"
      overflow="hidden"
      borderRadius="sm"
      borderWidth="1px"
      layerStyle={"borderSubtle"}
    >
      <Heading
        fontSize="md"
        as="h3"
        fontWeight="bold"
        mb={1}
        layerStyle={link ? "textPrimary" : "textTertiary"}
      >
        {isLeft ? "Previous" : "Next"} Article
      </Heading>
      {link ? (
        <Text as="p" mb={0} fontSize="md" layerStyle="textSecondary">
          {link.frontmatter.title}
        </Text>
      ) : (
        <Text mb={0} as="i" layerStyle="textTertiary" fontSize="md">
          {isLeft ? (
            "Wow you just read the first post. Why are you even here?"
          ) : (
            <>
              <Link
                rel="noopener noreferrer"
                href="https://www.youtube.com/watch?v=co1VrBdaRhA"
                target="_blank"
              >
                Sheeesh
              </Link>
              , you just read the last post
            </>
          )}
        </Text>
      )}
    </Box>
  )

  if (!link) {
    return data
  }

  return (
    <Link
      as={GatsbyLink}
      to={link.fields.slug}
      textDecoration="none !important"
      height="100%"
    >
      {data}
    </Link>
  )
}

function makeHeader(type) {
  return ({ children, ...props }) => (
    <Heading
      as={type}
      mb={4}
      transition={transition}
      fontSize={["xl", null, "2xl"]}
      {...props}
    >
      {children}
    </Heading>
  )
}

export default function Post({ data, pageContext, location }) {
  const post = data.mdx
  const { previous, next, ogImage } = pageContext
  const brand = useBrandColor()
  const brandSecondary = useBrandSecondaryColor()
  const { imageTop, imageBottom } = post.frontmatter
  const borderSubtle = useColorModeValue(
    colors.borderSubtle.light,
    colors.borderSubtle.dark
  )
  const isDraft = post.frontmatter.draft
  return (
    <>
      <Layout imageTop={imageTop} imageBottom={imageBottom}>
        <Box
          transition={transition}
          layerStyle="bgSecondary"
          borderColor={borderSubtle}
          pt={[8, 12, 24]}
          borderBottomWidth="1px"
        >
          <Grid
            gap={2}
            as="header"
            p={layoutContentPadding}
            mx="auto"
            maxWidth={maxWidth}
          >
            {post.frontmatter.draft && (
              <Box mb={2}>
                <Flex
                  zIndex={10}
                  width="100%"
                  mx="auto"
                  flexFlow="row"
                  maxWidth={maxWidth}
                >
                  <Text
                    color={brand}
                    fontSize={["sm", null, "lg"]}
                    fontWeight="bold"
                  >
                    🥺 You're viewing a draft. This post is not published.
                  </Text>
                </Flex>
              </Box>
            )}
            <Flex alignItems="center" layerStyle="textTertiary">
              <Text as="time" dateTime={post.frontmatter.date} color="gray.500">
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
              layerStyle="textTertiary"
            >
              {post.frontmatter.description}
            </Text>
          </Grid>
        </Box>
        <LayoutContent mx="auto" maxWidth={maxWidth}>
          <SEO
            canonical={post.slug}
            title={post.frontmatter.title}
            description={post.frontmatter.description || post.excerpt}
            image={ogImage}
          />
          <Grid as="article" gap={2}>
            <Box
              className="blog-post"
              as="section"
              fontSize="lg"
              lineHeight="1.7"
            >
              <MDXProvider
                scope={{ transition }}
                components={{
                  ...MarkdownComponents,
                  ...MarkdownOverrides,
                  ...Chakra,
                  ...ChakraReact,
                  getImage,
                  GatsbyImage,
                  StaticImage,
                  maxWidth,
                  Text,
                  ChakraImage: Image,
                  Toastable,
                  Hr,
                  a: ({ children, ...props }) => (
                    <Link color={brandSecondary} {...props}>
                      {children}
                    </Link>
                  ),
                  RoughNotation,
                  h6: makeHeader("h6"),
                  h5: makeHeader("h5"),
                  h4: makeHeader("h4"),
                  h3: makeHeader("h3"),
                  h2: makeHeader("h2"),
                  h1: makeHeader("h1"),
                  table: ({ children, ...props }) => (
                    <Table mb={6} {...props}>
                      {children}
                    </Table>
                  ),
                  th: Th,
                  tr: Tr,
                  td: ({ children, ...props }) => (
                    <Td
                      fontSize={["sm", "md", "lg"]}
                      verticalAlign="initial"
                      {...props}
                    >
                      {children}
                    </Td>
                  ),
                  blockquote: ({ children, ...props }) => (
                    <Box
                      as="blockquote"
                      layerStyle="borderSubtle"
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
                      transition={transition}
                      fontSize={["md", null, "lg"]}
                      mb={6}
                      {...props}
                    >
                      {children}
                    </Text>
                  ),
                }}
              >
                <MDXRenderer>{post.body}</MDXRenderer>
              </MDXProvider>
            </Box>
            {!isDraft && (
              <>
                <Hr />
                <Box as="footer">
                  <Grid
                    as="section"
                    gridAutoFlow="row"
                    alignItems="center"
                    justifyContent="center"
                    gridTemplateColumns={["1fr", null, null, "1fr 1fr"]}
                    flexDirection={["row", "column"]}
                    gap={4}
                    m={0}
                    p={0}
                    className="justify-center flex flex-row p-0 m-0 text-sm w-fullgap-4"
                  >
                    <Navigator pos="left" link={previous} />
                    <Navigator pos="right" link={next} />
                  </Grid>
                </Box>
              </>
            )}
          </Grid>
          <PopupPortal>
            <Popup />
          </PopupPortal>
        </LayoutContent>
      </Layout>
    </>
  )
}
export const pageQuery = graphql`
  fragment Cover on File {
    image: childImageSharp {
      gatsbyImageData(
        quality: 90
        breakpoints: [400, 1200, 1920]
        layout: FULL_WIDTH
      )
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
        slug
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
      }
    }
  }
`
