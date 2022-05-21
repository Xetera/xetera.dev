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

const siteTitle = `Xetera`
const discordId = "140862798832861184"
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
      twitter: `_Xetera`,
      github: `xetera`,
      discordId,
    },
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        "@assets": path.join(__dirname, "content", "assets"),
        "@src": path.join(__dirname, "src"),
      },
    },
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
              maxWidth: 1000,
              backgroundColor: "transparent",
              wrapperStyle: img => {
                return `max-width: ${Math.min(img.presentationWidth, 1000)}px`
              },
              tracedSvg: true,
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
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        stripMetadata: true,
      },
    },
    "gatsby-plugin-postcss",
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-133545986-8`,
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
    {
      resolve: "gatsby-plugin-webpack-bundle-analyser-v2",
      options: { devMode: process.env.ANALYZE === "true" },
    },
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
            title: "Xetera",
            // im not sure how to resolve site url automatically here
            image_url: "https://xetera.dev/favicon-32x32.png",
            feed_url: "https://xetera.dev/rss.xml",
            site_url: "https://xetera.dev",
          },
        ],
      },
    },
    "gatsby-plugin-schema-snapshot",
    "gatsby-plugin-netlify",
    {
      resolve: "gatsby-plugin-purge-cloudflare-cache",
      options: {
        token: process.env.CLOUDFLARE_TOKEN,
        zoneId: "a1d7f18737bc37144427635bf256aabe",
        condition: () => Boolean(process.env.CLOUDFLARE_TOKEN),
      },
    },
  ],
}
