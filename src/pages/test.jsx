import React from "react"
import { graphql } from "gatsby"
import PostPreview from "../templates/preview"

export default props => {
  console.log({ props })
  return <PostPreview {...props} />
}

export const pageQuery = graphql`
  fragment Cover on File {
    image: childImageSharp {
      fluid(quality: 90, srcSetBreakpoints: [400, 1200, 1920], maxWidth: 1920) {
        ...GatsbyImageSharpFluid_withWebp
      }
    }
  }
  query TestPage {
    site {
      siteMetadata {
        title
      }
    }
    mdx(fields: { slug: { eq: "/typescript-nextjs/" } }) {
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
