import React from "react"
import ExternalLink from "./ExternalLink"
import Image from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"
import { BackgroundImage } from "./Image"
import { Box, Flex, Grid, Heading, Link, Stack, Text } from "@chakra-ui/layout"
// import { Image } from "@chakra-ui/image"
import { useBreakpointValue } from "@chakra-ui/media-query"
import { RiGithubFill, RiGithubLine, RiTwitterFill } from "react-icons/ri"
import { forwardRef } from "@chakra-ui/system"
import { useBrandColor } from "../hooks/color"

const Bio = forwardRef((props, ref) => {
  const data = useStaticQuery(graphql`
    fragment SocialMedia on File {
      data: childImageSharp {
        fixed(width: 25, height: 25) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    query BioQuery {
      avatar: file(absolutePath: { regex: "/avatar.png/" }) {
        data: childImageSharp {
          fixed(width: 200, height: 200) {
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
  const avatar = data.avatar.data.fixed
  const brand = useBrandColor()
  return (
    <Stack lineHeight="1.8" spacing={4} ref={ref} {...props}>
      <Flex
        borderWidth="5px"
        borderColor={brand}
        width="min-content"
        mb={2}
        p={2}
        transition="all 0.4s ease"
      >
        <Image fixed={avatar} loading="lazy" />
      </Flex>
      <Heading fontWeight="black" fontSize="3xl">
        Hi, I’m Xetera.
      </Heading>
      <Stack spacing={4} fontSize="16px">
        <Text>
          I'm currently a full-stack developer at{" "}
          <Link
            href="https://top.gg"
            rel="external nofollower noopener"
            color={brand}
          >
            Top.gg
          </Link>
          . I like to wear many hats when necessary and make cool ideas come to
          life.
        </Text>
        <Text>
          I’m a simp for functional programming and anti-abuse engineering. I
          also enjoy design and writing on the side when I can find the time.
        </Text>
        <Text>
          I have watched <Link color={brand}>{`{placeholder}`}</Link> animes so
          far and I’m rank <Link color={brand}>123,456 in osu.</Link> I find
          myself enjoying these technologies as of recently.
        </Text>
      </Stack>
      <Stack spacing={4} direction="row">
        <Link
          href="https://github.com/xetera"
          color="unset"
          _hover={{ color: "white" }}
        >
          <RiGithubFill size={28} />
        </Link>
        <Link
          href="https://twitter.com/_Xetera"
          color="unset"
          _hover={{ color: "blue.400" }}
        >
          <RiTwitterFill size={28} />
        </Link>
      </Stack>
    </Stack>
  )
})

export default Bio
