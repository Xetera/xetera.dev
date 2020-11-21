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
      <div className="flex sm:items-center mb-4 sm:flex-row flex-col items-start">
        <p className="mb-0 lg:text-lg text-gray-300">
          Hi I'm Ali, I'm currently a full-stack developer at{" "}
          <ExternalLink href="https://top.gg">top.gg</ExternalLink>. I enjoy
          writing, among other things, although you'll soon come to find out
          that I am not very good at it.
        </p>
      </div>
      <div className="mb-2">
        {/* <p className="mb-2 text-gray-400">Follow me on social media</p>
        <div
          className="grid gap-4 grid-flow-col mb-6"
          style={{ width: "max-content" }}
        >
          <ExternalLink
            href={`https://github.com/xetera`}
            className="flex items-center text-sm bg-gray-500 px-5 py-2 text-gray-100 rounded focus:ring"
          >
            Github
          </ExternalLink>
          <ExternalLink
            href={`https://twitter.com/${data.site.siteMetadata.social.twitter}`}
            className="flex items-center text-sm bg-blue-400 text-blue-100 px-5 py-2 rounded focus:ring"
          >
            Twitter
          </ExternalLink>
        </div> */}
        <p className="text-gray-400 text-sm leading-6">
          <i>
            Views expressed on this blog are probably an amalgamation of
            different people's opinions, maybe not my own but definitely not my
            employer's.
          </i>
        </p>
      </div>
    </>
  )
}
