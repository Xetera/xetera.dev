import React from "react"
import { graphql } from "gatsby"
import Bio from "../components/Bio"
import { PostList } from "../components/PostShared"
import { Layout, LayoutContent, StackedSection } from "../components/Layout"
import { Flex, Grid, Stack, Text } from "@chakra-ui/layout"
import { Helmet } from "react-helmet"
import SEO from "../components/Seo"
import { RiGithubFill, RiRssFill } from "react-icons/ri"
import ExternalLink from "../components/ExternalLink"
import { SpotifyLikedSongs } from "../components/Music/SpotifyLikedSongs"
import { SectionHeader } from "../components/Typography"
import { Sidebar } from "../components/Sidebar/Sidebar"

const BlogIndex = ({ data, pageContext }) => {
  const posts = data.allMdx.edges
  return (
    <Layout
      display="flex"
      flexDirection="column"
      maxWidth="1200px"
      margin={["0 auto", null, "5% auto"]}
      gap={{ base: 6, md: 10, lg: 24 }}
    >
      <SEO canonical="/" image={pageContext.ogImage} />
      <Helmet>
        <title>{data.site.siteMetadata.title}</title>
      </Helmet>
      <Bio />
      <LayoutContent
        gridAutoFlow="row"
        gridTemplateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}
        gridTemplateAreas={{
          base: `
          "blog"
          "spotify"
        `,
          lg: `
            "blog blog spotify"
          `,
        }}
      >
        <StackedSection gridArea="blog" flex={1}>
          <Flex
            flexFlow="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Flex alignItems="center">
              <SectionHeader>{posts.length} Posts</SectionHeader>
              <ExternalLink
                color="text.300"
                ml={2}
                href="/rss.xml"
                aria-label="Go to RSS feed"
              >
                <RiRssFill size={15} /> {/* 16 just doesnt look right */}
              </ExternalLink>
            </Flex>
            <Flex alignItems="center">
              <ExternalLink
                color="text.300"
                fontSize="xs"
                mr={2}
                href="https://github.com/xetera/xetera.dev"
              >
                View the site's code
              </ExternalLink>
              <RiGithubFill size={18} />
            </Flex>
            {/* <PostSwitch /> */}
          </Flex>
          <Grid gap={10}>
            {posts.map(({ node }) => (
              <PostList node={node} key={node.fields.slug} />
            ))}
          </Grid>
        </StackedSection>
        <Sidebar />
      </LayoutContent>
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
            date(formatString: "MMMM D, YYYY")
            rawDate: date
            title
            description
            tags
          }
        }
      }
    }
  }
`
