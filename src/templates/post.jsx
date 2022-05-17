import React from "react"
import { Hr, Layout, LayoutContent } from "../components/Layout"
import { Link as GatsbyLink, graphql } from "gatsby"
import Popup from "../components/Popup"
import SEO from "../components/Seo"
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import PopupPortal, { Toastable } from "../components/Popup"
import { RoughNotation } from "react-rough-notation"
import { MDXProvider } from "@mdx-js/react"
import { Skeleton } from "@chakra-ui/skeleton"
import * as Chatbox from "../components/memes/Chatbox"
import * as AllMarkdownComponents from "../components/Markdown"
import { Link, Box, Flex, Grid, Heading, HStack, Text } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/button"
import { Image } from "@chakra-ui/image"
import { ImageWrapper, Constrain, WideMedia } from "../components/Image"
import { Table, Td, Th, Tr } from "@chakra-ui/table"
import { Tag } from "@chakra-ui/tag"
import { maxWidth } from "../shared"
import { CenteredGrid } from "../components/CenteredGrid"
import sample from "lodash/sample"
import { ExContextWrapper } from "../components/memes/Ex"
import formatDistance from "date-fns/formatDistance"
import { DraftDisclaimer } from "../components/post/draft"
import { T } from "../components/Typography"
import * as postData from "../components/posts"

const { overrides: MarkdownOverrides, ...rest } = AllMarkdownComponents
const MarkdownComponents = rest

const Navigator = ({ pos, link }) => {
  const isLeft = pos === "left"

  const data = (
    <Box
      p={6}
      m={0}
      height="100%"
      overflow="hidden"
      borderRadius="sm"
      borderWidth="1px"
      borderColor="borderSubtle"
    >
      <Heading
        fontSize="md"
        as="h3"
        fontWeight="semibold"
        mb={3}
        color={link ? "text.100" : "text.400"}
      >
        {isLeft ? "Previous" : "Next"} Article
      </Heading>
      {link ? (
        <Text as="p" mb={0} fontSize="md" color="text.300">
          {link.frontmatter.title}
        </Text>
      ) : (
        <Text mb={0} as="i" color="text.400" fontSize="md">
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

function makeHeader(type, { fonts = ["xl", null, "2xl"], ...rest } = {}) {
  return ({ children, ...props }) => (
    <Heading
      as={type}
      mb={4}
      fontSize={fonts}
      color="text.200"
      fontWeight="medium"
      {...props}
      {...rest}
    >
      {children}
    </Heading>
  )
}

export default function Post(props) {
  const { data, pageContext } = props
  const post = data.mdx
  const { previous, next, ogImage } = pageContext
  const { imageTop, imageBottom } = post.frontmatter
  const isDraft = post.frontmatter.draft
  const distance = formatDistance(new Date(post.frontmatter.date), new Date(), {
    addSuffix: true,
  })

  return (
    <>
      <Layout imageTop={imageTop} imageBottom={imageBottom}>
        <LayoutContent mx="auto" width="100%">
          <SEO
            canonical={post.slug}
            title={post.frontmatter.title}
            description={post.frontmatter.description || post.excerpt}
            image={ogImage}
          />
          <Grid gap={24}>
            <CenteredGrid
              gridRowGap={3}
              as="header"
              mx="auto"
              width="100%"
              mt={[8, 12, 18]}
            >
              <Text color="text.300">
                <Box
                  as="span"
                  fontWeight="semibold"
                  color="brand.100"
                  textTransform="uppercase"
                >
                  {isDraft && "Draft"} Article
                </Box>
                <Box mx={3} as="span">
                  —
                </Box>
                {post.fields.readingTime.text}
              </Text>
              <Heading
                as="h1"
                mb={2}
                color="text.200"
                fontSize={["3xl", "4xl", "7xl"]}
                lineHeight="110%"
                fontWeight="black"
              >
                {post.frontmatter.title}
              </Heading>
              <Text
                as="h2"
                fontSize={["lg", "xl"]}
                fontWeight="normal"
                color="text.300"
                mb={4}
              >
                {post.frontmatter.description}
              </Text>
              {isDraft && <DraftDisclaimer />}
              <Hr />
              <Flex
                alignItems="flex-start"
                color="text.400"
                justify="space-between"
                flexDirection={{ base: "column", md: "row" }}
              >
                <HStack
                  mb={{ base: 2, md: 0 }}
                  justify="center"
                  textTransform="capitalize"
                  // fontSize="sm"
                  spacing={{ base: 4, md: 6 }}
                  fontWeight="medium"
                >
                  {post.frontmatter.tags.map((tag, i) => (
                    <Text color="brand.100" key={tag}>
                      {tag}
                    </Text>
                  ))}
                </HStack>
                <Flex
                  alignItems={{ base: "flex-start", md: "flex-end" }}
                  flexDirection="column"
                >
                  <Text
                    as="time"
                    dateTime={post.frontmatter.date}
                    color="text.100"
                  >
                    {post.frontmatter.date}
                  </Text>
                  <Text fontSize="sm">{distance}</Text>
                </Flex>
              </Flex>
            </CenteredGrid>
            <CenteredGrid
              className="blog-post centered-grid"
              fontSize="lg"
              lineHeight={{ base: "180%", md: "200%" }}
            >
              <ExContextWrapper>
                <MDXProvider
                  components={{
                    T,
                    ...Chatbox,
                    ...MarkdownComponents,
                    ...MarkdownOverrides,
                    ...postData,
                    Link,
                    Box,
                    Flex,
                    Grid,
                    Button,
                    getImage,
                    Constrain,
                    ImageWrapper,
                    WideMedia,
                    GatsbyImage,
                    StaticImage,
                    maxWidth,
                    Text,
                    Heading,
                    Skeleton,
                    Tag,
                    ChakraImage: Image,
                    Image,
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
                    h4: makeHeader("h4", { fonts: ["md", "lg", "xl"] }),
                    h3: makeHeader("h3", { fonts: ["md", "lg", "2xl"] }),
                    h2: makeHeader("h2", { fonts: ["md", "lg", "2xl"], mt: 6 }),
                    h1: makeHeader("h1", {
                      fonts: ["lg", "xl", "4xl"],
                      mt: 8,
                      mb: 8,
                    }),
                    table: ({ children, ...props }) => (
                      <Box overflowX="auto" mb={8}>
                        <Table {...props}>{children}</Table>
                      </Box>
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
                    ul: ({ children, ...props }) => (
                      <Box
                        as="ul"
                        listStyleType={sample([
                          "katakana",
                          "hiragana",
                          "simp-chinese-formal",
                          "korean-hanja-formal",
                          "korean-hangul-formal",
                        ])}
                        fontSize={["md", null, "lg"]}
                        mb={8}
                        {...props}
                      >
                        {children}
                      </Box>
                    ),
                    blockquote: ({ children, ...props }) => (
                      <Box
                        as="blockquote"
                        textAlign="center"
                        borderColor="borderSubtle"
                        fontSize={{ base: "lg", lg: "2xl" }}
                        color="text.200"
                        mt={4}
                        mb={8}
                        px={{ base: 8, lg: 24 }}
                        {...props}
                      >
                        {children}
                      </Box>
                    ),
                    p: ({ children, ...props }) => (
                      <Text
                        as="p"
                        fontSize={["md", null, "lg"]}
                        mb={8}
                        {...props}
                      >
                        {children}
                      </Text>
                    ),
                  }}
                >
                  <MDXRenderer>{post.body}</MDXRenderer>
                </MDXProvider>
              </ExContextWrapper>
            </CenteredGrid>
            {!isDraft && (
              <CenteredGrid>
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
              </CenteredGrid>
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
