import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { graphql, useStaticQuery } from "gatsby"
import ExternalLink from "./ExternalLink"
import { Flex, Heading, Link, Box, Stack, Text } from "@chakra-ui/layout"
import {
  RiGithubFill,
  RiSafariLine,
  RiMailFill,
  RiKeyFill,
} from "react-icons/ri"
import { forwardRef } from "@chakra-ui/system"
import { Hr } from "./Layout"
import { m } from "framer-motion"
import { useIsSafari } from "../hooks/is-safari"

const MotionFlex = m(Flex)

const Bio = React.memo(
  forwardRef((props, ref) => {
    const data = useStaticQuery(staticQuery)
    const { isSafari } = useIsSafari()

    const twitter = data.site.siteMetadata.social.twitter
    const image = (
      <Flex
        borderRadius="md"
        overflow="hidden"
        borderColor="brandSecondary"
        width="min-content"
        mb={2}
      >
        <GatsbyImage
          image={data.avatar.data.gatsbyImageData}
          alt="Avatar image"
        />
      </Flex>
    )
    return (
      <>
        <Stack lineHeight="1.7" spacing={4} ref={ref} {...props}>
          {image}
          <Heading fontWeight="black" fontSize="3xl" color="text.100">
            Hi, I’m narigon.
          </Heading>
          <Stack spacing={4} fontSize="16px">
            <Text>
              I'm currently a full-stack developer at{" "}
              <Link
                href="https://oksidia.fi"
                rel="external nofollower noopener"
                color="brandSecondary"
              >
                Oksidia Oy
              </Link>
              . I'm 25 years old and I'm trying to get better at software
              development.
            </Text>
            <Text>
              This blog is my outlet where I can talk about various development
              related topics aswell as some hobby related stuff. I also enjoy
              photography and mechanical keyboards. I can guarantee you will be
              finding more about those in my blog.{" "}
            </Text>
            <Text>
              <Link
                href="/publickey.tatu@narigon.dev-8d409ff7767d83f81fc2d5f5a4c5e8fdd1746806.asc"
                color="brandSecondary"
                display="inline-block"
                aria-label="PGP Key"
              >
                PGP key for email
              </Link>
            </Text>
          </Stack>
          <Stack spacing={4} direction="row">
            <Link
              href="https://github.com/tatupesonen"
              color="unset"
              _hover={{ color: "brand.100" }}
              aria-label="github link"
            >
              <RiGithubFill size={28} />
            </Link>
            <Link
              href={`mailto:tatu@narigon.dev`}
              color="unset"
              _hover={{ color: "brand.100" }}
              aria-label="email"
            >
              <RiMailFill size={28} />
            </Link>
            <Link
              href="/publickey.tatu@narigon.dev-8d409ff7767d83f81fc2d5f5a4c5e8fdd1746806.asc"
              color="unset"
              _hover={{ color: "brand.100" }}
              aria-label="email"
            >
              <RiKeyFill size={28} />
            </Link>
          </Stack>
          {isSafari && (
            <>
              <Hr />
              <MotionFlex
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Flex
                  flexFlow="column"
                  position="sticky"
                  top={6}
                  justify="center"
                >
                  <Heading
                    as="h4"
                    fontSize="lg"
                    color="text.300"
                    mb={2}
                    alignItems="center"
                    display="flex"
                  >
                    <RiSafariLine size={18} />
                    <Box marginInlineStart={2}>Oh no</Box>
                  </Heading>
                  <Text color="text.500" fontSize="sm">
                    It looks like you're using an outdated browser that can't
                    keep up with web standards. Some functionality on the site
                    might feel a little broken, sorry. 😭
                  </Text>
                </Flex>
              </MotionFlex>
            </>
          )}
        </Stack>
      </>
    )
  })
)

export default Bio

const staticQuery = graphql`
  fragment SocialMedia on File {
    data: childImageSharp {
      gatsbyImageData(width: 25, height: 25, layout: FIXED)
    }
  }

  query BioQuery {
    avatar: file(absolutePath: { regex: "/avatars/narigon.png/" }) {
      data: childImageSharp {
        gatsbyImageData(
          width: 200
          height: 200
          layout: FIXED
          quality: 90
          placeholder: TRACED_SVG
        )
      }
    }
    site {
      buildTime(formatString: "MMMM Do, YYYY")
      siteMetadata {
        social {
          twitter
        }
      }
    }
  }
`
