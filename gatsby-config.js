const path = require("path")
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })

const siteTitle = `Xetera`
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
    },
  },
  flags: { PRESERVE_WEBPACK_CACHE: true },
  plugins: [
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        "@assets": path.join(__dirname, "content", "assets"),
      },
    },
    "gatsby-remark-images",
    `gatsby-plugin-image`,
    {
      resolve: "@chakra-ui/gatsby-plugin",
      options: {
        resetCSS: true,
      },
    },
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
                quality: 90,
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
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    "gatsby-plugin-open-graph-images",
    "gatsby-plugin-webpack-bundle-analyser-v2",
  ],
}
