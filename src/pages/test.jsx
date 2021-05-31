import React from "react"
import { graphql } from "gatsby"
import PostPreview from "../templates/preview"

const Test = props => {
  return <PostPreview {...props} />
}

export default Test

export const pageQuery = graphql`
  fragment Cover on File {
    image: childImageSharp {
      gatsbyImageData(
        quality: 90
        breakpoints: [400, 1200, 1920]
        layout: FULL_WIDTH
      )
    }
  }

  query TestPage {
    site {
      siteMetadata {
        title
      }
    }
    mdx(fields: { slug: { eq: "/parasocial-dynamics-of-kpop/" } }) {
      id
      excerpt(pruneLength: 160)
      body
      fields {
        readingTime {
          text
        }
      }
      frontmatter {
        draft
        title
        tags
        date(formatString: "MMMM DD, YYYY")
        description
        imageTop {
          src {
            ...Cover
          }
          opacity
        }
        imageBottom {
          src {
            ...Cover
          }
          opacity
        }
      }
    }
  }
`
