const path = require("path")
require("dotenv/config")

const cheerio = require("cheerio")

const fixRelativeLinks = (html, siteUrl) => {
  const $ = cheerio.load(html, {
    decodeEntities: false,
  })

  $("a[href], img[src]").each(function () {
    const href = $(this).attr("href")
    if (typeof href == "string" && !href.startsWith("http")) {
      $(this).attr("href", siteUrl + (href.startsWith("/") ? "" : "/") + href)
    }
    const src = $(this).attr("src")
    if (typeof src == "string" && !src.startsWith("http")) {
      $(this).attr("src", siteUrl + (src.startsWith("/") ? "" : "/") + src)
    }
  })

  return $.html()
}

const siteTitle = `narigon`
const discordId = "121777389012385796"
const themeColor = `#112130`

module.exports = {
  siteMetadata: {
    title: siteTitle,
    author: {
      name: process.env.GATSBY_OWNER_FULL_NAME,
    },
    description: "A place for my ramblings.",
    siteUrl: process.env.GATSBY_SITE_URL || "http://localhost:8000",
    themeColor,
    social: {
      twitter: `_narigon`,
      github: `tatupesonen`,
      discordId,
    },
  },
  flags: { FAST_DEV: true, DEV_SSR: false },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        "@assets": path.join(__dirname, "content", "assets"),
      },
    },
    "gatsby-remark-images",
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [".md", ".mdx"],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              backgroundColor: "transparent",
              withWebp: {
                quality: 95,
              },
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "nofollow noopener external",
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
        rehypePlugins: [
          // Generate heading ids for rehype-autolink-headings
          require("rehype-slug"),
          // To pass options, use a 2-element array with the
          // configuration in an object in the second element
          [require("rehype-autolink-headings"), { behavior: "wrap" }],
        ],
      },
    },
    "gatsby-plugin-twitter",
    "gatsby-remark-reading-time",
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    "gatsby-plugin-postcss",
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-216525669-1`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: siteTitle,
        short_name: siteTitle,
        start_url: `/`,
        background_color: `#000000`,
        theme_color: themeColor,
        display: `minimal-ui`,
        icon: `content/assets/favicon.png`,
      },
    },
    "gatsby-plugin-open-graph-images",
    "gatsby-plugin-webpack-bundle-analyser-v2",
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.description, // or excerpt
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  enclosure: {
                    url:
                      site.siteMetadata.siteUrl +
                      edge.node.fields.slug +
                      "thumbnail.png",
                  },
                  custom_elements: [
                    {
                      "content:encoded": fixRelativeLinks(
                        edge.node.html,
                        site.siteMetadata.siteUrl
                      ),
                    },
                  ],
                })
              })
            },
            query: `{
              allMdx(
                sort: { fields: [frontmatter___date], order: DESC }
                filter: { frontmatter: { draft: { ne: true } } }
              ) {
                edges {
                  node {
                    html
                    fields { slug }
                    frontmatter {
                      title
                      date
                      description
                    }
                  }
                }
              }
            }`,
            output: "/rss.xml",
            title: "narigon",
            // im not sure how to resolve site url automatically here
            image_url: "https://narigon.dev/favicon-32x32.png",
            feed_url: "https://narigon.dev/rss.xml",
            site_url: "https://narigon.dev",
          },
        ],
      },
    },
  ],
}
