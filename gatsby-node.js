import path from "path"
import { createFilePath } from "gatsby-source-filesystem"
import { createOpenGraphImage } from "gatsby-plugin-open-graph-images"
import { postPreviewDimensions } from "./src/shared"
import { getAnilist, getOsu } from "./fetcher"

export const sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  console.log("creating nodes!")
  const [anilist, osu] = await Promise.all([getAnilist(), getOsu()])
  actions.createNode({
    ...anilist,
    id: createNodeId(`user-information-anilist`),
    internal: {
      type: `Anilist`,
      contentDigest: createContentDigest(anilist),
    },
  })
  actions.createNode({
    ...osu,
    user_id: osu.id,
    id: createNodeId(`user-information-osu`),
    internal: {
      type: `Osu`,
      contentDigest: createContentDigest(osu),
    },
  })
}

export const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(
    path.join(__dirname, `./src/templates/post.jsx`)
  )
  const blogPostPreview = path.resolve(
    path.join(__dirname, `./src/templates/preview.jsx`)
  )
  const result = await graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                draft
                title
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMdx.edges

  // sometimes there are drafts that we don't want to display
  // so the next post needs to be one that isn't a draft
  const findNonDraft = nodes =>
    nodes.find(node => !node.node.frontmatter.draft)?.node ?? null

  posts.forEach(async (post, index) => {
    const previousNodes = posts.slice(index + 1)

    const previous = findNonDraft(previousNodes)
    const nextNodes = posts.slice(0, index)
    const next = findNonDraft(nextNodes.reverse())

    const { slug } = post.node.fields
    const context = {
      slug,
      previous,
      next,
    }
    const previewPath = `/${slug.replace(
      /\//g,
      ""
    )}/thumbnail.png?t=${Date.now()}`

    createPage({
      path: slug,
      component: blogPost,
      context: {
        ...context,
        ogImage: createOpenGraphImage(createPage, {
          path: previewPath,
          component: blogPostPreview,
          size: postPreviewDimensions,
          context,
        }),
      },
    })
  })
}

export const onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

export const onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  })
}
