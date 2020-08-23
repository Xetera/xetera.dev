import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const SEO = ({ description, lang, meta, title }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        preview: file(absolutePath: { regex: "/assets/preview.png/" }) {
          image: childImageSharp {
            fluid(maxWidth: 1920) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
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

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${siteTitle}`}
      meta={[
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
      ].concat(meta)}
    >
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:creator"
        content={`@${site.siteMetadata.social.twitter}`}
      />
      <meta
        name="twitter:site"
        content={`@${site.siteMetadata.social.twitter}`}
      />
      <meta name="twitter:siteTitle" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="theme-color" content={site.siteMetadata.themeColor} />
      <meta name="description" content={metaDescription} />
      {/* <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${site.siteMetadata.analytics}`}
      ></script>
      <script type="application/ld+json">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('config', '${site.siteMetadata.analytics}');
      `}</script> */}
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
