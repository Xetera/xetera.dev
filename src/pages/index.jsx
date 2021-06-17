import React from "react"
import { Link as GatsbyLink, graphql, PageProps } from "gatsby"
import Bio from "../components/Bio"
import PostData, { PostList, Tags } from "../components/PostShared"
import { Layout, LayoutContent } from "../components/Layout"
import { Box, Flex, Grid, Heading, Link, Stack, Text } from "@chakra-ui/layout"
import { useBrandColor } from "../hooks/color"
import { Helmet } from "react-helmet"
import SEO from "../components/Seo"

const BlogIndex = ({ data, pageContext }) => {
  console.log({ pageContext })
  const posts = data.allMdx.edges
  const brand = useBrandColor()
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
