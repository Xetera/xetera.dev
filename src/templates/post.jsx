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
import * as Chatbox from "../components/memes/Chatbox"
import * as AllMarkdownComponents from "../components/Markdown"
import * as Chakra from "@chakra-ui/layout"
import * as ChakraReact from "@chakra-ui/react"
import { Image } from "@chakra-ui/image"
import { Table, Td, Th, Tr } from "@chakra-ui/table"
import { Text } from "@chakra-ui/react"
import { colors, transition } from "../data/theme"
import { maxWidth } from "../shared"
import { avatars } from "../components/Avatars"

const { overrides: MarkdownOverrides, ...rest } = AllMarkdownComponents
const MarkdownComponents = rest
const { Box, Flex, Grid, Heading, Link, HStack } = Chakra

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
      borderColor="borderSubtle"
    >
      <Heading
        fontSize="md"
        as="h3"
        fontWeight="bold"
        mb={1}
        color={link ? "text.100" : "text.500"}
      >
        {isLeft ? "Previous" : "Next"} Article
      </Heading>
      {link ? (
        <Text as="p" mb={0} fontSize="md" color="text.300">
          {link.frontmatter.title}
        </Text>
      ) : (
        <Text mb={0} as="i" color="text.500" fontSize="md">
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

function makeHeader(type, fonts = ["xl", null, "2xl"]) {
  return ({ children, ...props }) => (
    <Heading
      as={type}
      mb={4}
      transition={transition}
      fontSize={fonts}
      {...props}
    >
      {children}
    </Heading>
  )
}

export default function Post({ data, pageContext, location }) {
	console.log(pageContext);
  const post = data.mdx
  const { previous, next, ogImage } = pageContext
  const { imageTop, imageBottom } = post.frontmatter
  const isDraft = post.frontmatter.draft
  return (
    <>
      <Layout imageTop={imageTop} imageBottom={imageBottom}>
        <Box transition={transition} pt={[8, 12, 24]}>
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
                  justify="center"
                  maxWidth={maxWidth}
                >
                  <Text fontSize={["sm", null, "lg"]} fontWeight="bold">
                    🥺 You're viewing a draft. This post is not published.
                  </Text>
                </Flex>
              </Box>
            )}
            <Heading
              as="h1"
              mb={2}
              textAlign="center"
              color="text.100"
              fontSize={["xl", "2xl", "3xl"]}
              lineHeight="1.4"
              fontWeight="bold"
            >
              {post.frontmatter.title}
            </Heading>
            <Text
              fontSize={["lg", "xl"]}
              fontWeight="medium"
              color="text.300"
              textAlign="center"
            >
              {post.frontmatter.description}
            </Text>
            <Flex alignItems="center" color="text.500" justify="center">
              <Text as="time" dateTime={post.frontmatter.date}>
                {post.frontmatter.date}
              </Text>
              <Box mx={2}>{"–"}</Box>
              <Text>{post.fields.readingTime.text}</Text>
            </Flex>
            <HStack
              justify="center"
              textTransform="uppercase"
              fontSize="xs"
              spacing={4}
              fontWeight="medium"
            >
              {post.frontmatter.tags.map((tag, i) => (
                <Text color="brand.100" key={tag} color="brand.100">
                  {tag}
                </Text>
              ))}
            </HStack>
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
                  ...avatars,
                  ...Chatbox,
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
                    <Link color="brandSecondary" {...props}>
                      {children}
                    </Link>
                  ),
                  RoughNotation,
                  h6: makeHeader("h6"),
                  h5: makeHeader("h5"),
                  h4: makeHeader("h4", ["md", "lg", "xl"]),
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
                      borderColor="borderSubtle"
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
        }
      }
    }
  }
`
