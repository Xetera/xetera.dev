import React from "react"
import { graphql } from "gatsby"
import Bio from "../components/Bio"
import { PostList } from "../components/PostShared"
import { Layout, LayoutContent } from "../components/Layout"
import { Flex, Grid, Stack, Text } from "@chakra-ui/layout"
import { Helmet } from "react-helmet"
import SEO from "../components/Seo"
import { RiGithubFill, RiRssFill } from "react-icons/ri"
import ExternalLink from "../components/ExternalLink"

const BlogIndex = ({ data, pageContext }) => {
  const posts = data.allMdx.edges
  return (
    <Layout>
      <SEO canonical="/" image={pageContext.ogImage} />
      <Helmet>
        <title>{data.site.siteMetadata.title}</title>
      </Helmet>
      <LayoutContent
        maxWidth="1200px"
        margin={["0 auto", null, "5% auto", "8% auto"]}
        gridAutoFlow={["row", null, null]}
        gridTemplateColumns={["1fr", null, null, "3fr 4fr"]}
      >
        <Bio as="section" />
        <Stack as="section" flexFlow="column" spacing={6} width="100%">
          <Flex
            flexFlow="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Flex alignItems="center">
              <Text
                fontSize="sm"
                color="text.300"
                textTransform="uppercase"
                letterSpacing="1.5px"
                fontWeight="medium"
              >
                {posts.length} Posts
              </Text>
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
        </Stack>
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
