import React from "react"
import { Link as GatsbyLink, graphql, PageProps } from "gatsby"
import Bio from "../components/Bio"
import PostData, { Tags } from "../components/PostShared"
import { Layout, LayoutContent } from "../components/Layout"
import SEO from "../components/Seo"
import Navbar from "../components/Navbar"
import ExternalLink from "../components/ExternalLink"

import Sidebar from "../components/Sidebar"
import { Box, Flex, Grid, Heading, Link, Stack, Text } from "@chakra-ui/layout"
import { useBreakpointValue } from "@chakra-ui/media-query"
import { PostSwitch } from "../components/PostSwitch"
import { useColorModeValue } from "@chakra-ui/color-mode"
import { themedColors } from "../@chakra-ui/gatsby-plugin/theme"
import { useBrandColor } from "../hooks/color"

const BlogIndex = ({ data, location }) => {
  const posts = data.allMdx.edges
  const brand = useBrandColor()
  return (
    <Layout>
      <LayoutContent
        maxWidth="1200px"
        margin={["0 auto", null, "5% auto", "8% auto"]}
        gridAutoFlow={["row", null, null]}
        gridTemplateColumns={["1fr", null, null, "1fr 1fr"]}
      >
        <Bio as="section" />
        <Stack as="section" flexFlow="column" spacing={6} width="100%">
          <Flex
            flexFlow="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Heading fontSize="xl">{posts.length} Posts</Heading>
            <PostSwitch />
          </Flex>
          <Grid gap={6}>
            {posts.map(({ node }) => {
              const title = node.frontmatter.title ?? node.fields.slug
              const { description, date } = node.frontmatter

              return (
                <GatsbyLink
                  to={node.fields.slug}
                  className="no-link"
                  style={{
                    textDecoration: "none",
                  }}
                  key={node.fields.slug}
                >
                  <Flex as="article" flexFlow="column">
                    <Flex
                      // justifyContent="space-between"
                      alignItems="center"
                      mb={2}
                      color="gray.500"
                      fontSize="14px"
                    >
                      <Box as="time" dateTime="date">
                        {date}
                      </Box>
                      <Box mx="10px">·</Box>
                      <Text color="gray.500">
                        {node.fields.readingTime.text}
                      </Text>
                    </Flex>
                    <Heading
                      as="h2"
                      fontSize="18px"
                      layerStyle="textPrimary"
                      fontWeight="bold"
                      mb={2}
                    >
                      {title}
                    </Heading>
                    <Text as="p" fontSize="16px" color="text.secondary">
                      {description}
                    </Text>
                  </Flex>
                </GatsbyLink>
              )
            })}
          </Grid>
        </Stack>
      </LayoutContent>
      {/* 
      <Layout location={location}>
        <SEO title="Home" />
        <article className="flex flex-col">
          <div className="relative h-full">
            <Bio />
          </div>
          <main className="grid mx-auto max-w-6xl md:grid-cols-body grid-cols-1 px-6 pb-6 gap-10">
            <div className="xl:mr-5 h-full row-span-2" style={{}}>
              <Sidebar />
            </div>
            <div
              className="w-auto grid row-span-full md:row-span-1"
              style={{
                gap: "2.4rem",
              }}
            >
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
              <footer>
                <p className="text-sm leading-6 max-w-2xl mb-0 mb-1">
                  <i className="text-blueGray-400">
                    Views expressed on this blog are probably an amalgamation of
                    different people's opinions, maybe not my own but definitely
                    not my employer's.
                  </i>
                </p>
                <cite className="text-xs text-blueGray-500">
                  Cover image:{" "}
                  <ExternalLink
                    href="https://www.reddit.com/r/dreamcatcher/comments/fyb3d8/dystopia_the_tree_of_language_wallpaper_1920x1080/"
                    className="no-underline"
                  >
                    Dreamcatcher
                  </ExternalLink>
                </cite>
              </footer>
            </div>
          </main>
        </article>
      </Layout> */}
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
