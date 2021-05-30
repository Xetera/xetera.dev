import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const SEO = ({ description, lang, meta = [], title, image }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
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

  const metaDescription = description || site.siteMetadata.description
  const siteTitle = site.siteMetadata.title
  const data = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      property: `og:siteTitle`,
      content: title,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:creator`,
      content: site.siteMetadata.social.twitter,
    },
    {
      name: `twitter:siteTitle`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
    {
      name: "og:image",
      content: `http://localhost:9000/__generated/${image.path}`,
    },
    {
      name: "og:image:height",
      content: image.size.height,
    },
    {
      name: "og:image:width",
      content: image.size.width,
    },
  ]
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${siteTitle}`}
    >
      {data.concat(meta).map(({ name, content }) => (
        <meta name={name} content={content} key={name} />
      ))}
      <meta name="theme-color" content={site.siteMetadata.themeColor} />
      <meta name="description" content={metaDescription} />
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
