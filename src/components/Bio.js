import React from "react"
import ExternalLink from "./ExternalLink"
import { useStaticQuery, graphql } from "gatsby"
import { BackgroundImage } from "./Image"

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
      cover: file(absolutePath: { regex: "/dreamcatcher.jpg/" }) {
        image: childImageSharp {
          fluid(
            quality: 100
            srcSetBreakpoints: [640, 1600, 1920, 2400]
            maxWidth: 2400
          ) {
            ...GatsbyImageSharpFluid_withWebp
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
      <BackgroundImage
        image={data.cover.image.fluid}
        pos="top"
        options={{
          opacity: 0.07,
          height: "100%",
          WebkitMaskImage:
            "-webkit-gradient(linear, 0% 44%, 0% 100%, from(rgb(0, 0, 0)), to(rgba(0, 0, 0, 0)))",
        }}
      />
      <article className="max-w-6xl mx-auto relative">
        <section className="flex sm:items-center justify-center flex-col align-start lg:h-3-quarter-vh h-half-vh my-16 mx-6 text-center">
          <h1 className="lg:text-6xl mb-1">Hi, I'm Ali</h1>
          <p className="font-semibold text-blueGray-300">
            I make websites and stuff.
          </p>
          <p className="mb-0 lg:text-lg text-blueGray-300 max-w-xl text-left">
            I'm currently a full-stack developer at{" "}
            <ExternalLink href="https://top.gg" className="no-underline">
              top.gg
            </ExternalLink>
            . I enjoy design and writing on the side. I'm not really sure what
            to write here which is worrying considering this is a blog.
          </p>
        </section>
      </article>
      <div className="mb-2"></div>
    </>
  )
}
