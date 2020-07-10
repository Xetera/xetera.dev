import React from "react"
import Img from "gatsby-image"
import ExternalLink from "./ExternalLink"
import { useStaticQuery, graphql } from "gatsby"

export default function Bio() {
  const data = useStaticQuery(graphql`
    fragment SocialMedia on File {
      data: childImageSharp {
        fixed(width: 25, height: 25) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    query BioQuery {
      github: file(absolutePath: { regex: "/github.png/" }) {
        ...SocialMedia
      }
      twitter: file(absolutePath: { regex: "/twitter.png/" }) {
        ...SocialMedia
      }
      avatar: file(absolutePath: { regex: "/avatar.png/" }) {
        data: childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          social {
            twitter
          }
        }
      }
    }
  `)
  return (
    <>
      <div className="flex sm:items-center mt-8 mb-6 sm:flex-row flex-col items-start">
        <Img
          className="flex-shrink-0 w-12 h-12 mb-4 sm:mb-0 mr-4 rounded-full"
          fixed={data.avatar.data.fixed}
          alt="Profile"
        />
        <p className="mb-0 text-md text-gray-400">
          Hi, I'm a full-stack developer. Working on products that people love
          using gets me up in the morning. Currently building{" "}
          <ExternalLink href="https://dev.kiyomi.io">kiyomi.io</ExternalLink>
        </p>
      </div>
      <div className="mb-8">
        <div
          className="grid gap-4 grid-flow-col"
          style={{ width: "max-content" }}
        >
          <ExternalLink
            href={`https://github.com/${data.site.siteMetadata.social.github}`}
            className="flex items-center text-sm"
          >
            <Img
              fixed={data.github.data.fixed}
              alt="github"
              className="mr-3 mb-0 rounded-full"
            />{" "}
            Github
          </ExternalLink>
          <ExternalLink
            href={`https://twitter.com/${data.site.siteMetadata.social.twitter}`}
            className="flex items-center text-sm"
          >
            <Img
              name="twitter.png"
              alt="twitter"
              className="mr-3 mb-0 rounded-full"
              fixed={data.twitter.data.fixed}
            />{" "}
            Twitter
          </ExternalLink>
        </div>
      </div>
    </>
  )
}
