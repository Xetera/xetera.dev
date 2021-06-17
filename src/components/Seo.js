import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const SEO = ({ description, lang = "en", title, image, canonical }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          buildTime
          siteMetadata {
            siteUrl
            title
            themeColor
            description
            social {
              twitter
            }
          }
        }
      }
    `
  )

  const { siteUrl } = site.siteMetadata
  const metaDescription = description || site.siteMetadata.description
  const siteTitle = title || site.siteMetadata.title

  const data = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      name: `og:siteTitle`,
      content: siteTitle,
    },
    {
      name: `og:description`,
      content: metaDescription,
    },
    {
      name: "og:site_name",
      content: "Xetera",
    },
    {
      name: `twitter:card`,
      content: `summary_large_image`,
    },
    {
      name: `twitter:creator`,
      content: site.siteMetadata.social.twitter,
    },
    {
      name: "twitter:site",
      content: site.siteMetadata.social.twitter,
    },
    {
      name: `twitter:siteTitle`,
      content: siteTitle,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
    {
      name: "og:title",
      content: siteTitle,
    },
    {
      name: "og:description",
      content: metaDescription,
    },
  ]
  if (image) {
    data.push(
      {
        name: "og:image",
        // og image does some weird shit lol
        content: `${site.siteMetadata.siteUrl}${
          image.path.replace(/\/{1,}/g, "/")
          //cache busting
        }?t=${site.buildTime}`,
      },
      {
        name: "og:image:height",
        content: image.size.height,
      },
      {
        name: "og:image:width",
        content: image.size.width,
      }
    )
  }
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
    >
      {data.map(({ name, content }) => (
        <meta name={name} content={content} key={name} />
      ))}
      {canonical && (
        <link rel="canonical" href={new URL(canonical, siteUrl).href} />
      )}
      <meta name="theme-color" content={site.siteMetadata.themeColor} />
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
}

export default SEO
