import React from "react"
import ExternalLink from "./ExternalLink"
import { GatsbyImage } from "gatsby-plugin-image"
import { useStaticQuery, graphql } from "gatsby"
import { Box, Flex, Grid, Heading, Link, Stack, Text } from "@chakra-ui/layout"
// import { Image } from "@chakra-ui/image"
import { RiGithubFill, RiGithubLine, RiTwitterFill } from "react-icons/ri"
import { forwardRef } from "@chakra-ui/system"
import { useBrandColor } from "../hooks/color"

const Bio = forwardRef((props, ref) => {
  const data = useStaticQuery(staticQuery)

  const osuRank = Intl.NumberFormat("default").format(
    data.osu.statistics.globalRank
  )
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
        <GatsbyImage image={data.avatar.data.gatsbyImageData} />
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
          As of{" "}
          <Text
            as="time"
            dateTime={data.site.buildtime}
            layerStyle="textTertiary"
          >
            {data.site.buildTime}
          </Text>{" "}
          I have watched{" "}
          <Link
            color={brand}
            href="https://anilist.co/user/Xetera"
            rel="noopener external noreferrer"
          >
            {data.anilist.user.statistics.anime.count} animes
          </Link>{" "}
          and I’m rank{" "}
          <Link
            color={brand}
            href={`https://osu.ppy.sh/users/${data.osu.user_id}`}
            rel="noopener external noreferrer"
          >
            #{osuRank} in osu.
          </Link>
        </Text>
      </Stack>
      <Stack spacing={4} direction="row">
        <Link
          href="https://github.com/xetera"
          color="unset"
          _hover={{ filter: "brightness(2)" }}
        >
          <RiGithubFill size={28} />
        </Link>
        <Link
          href="https://twitter.com/_Xetera"
          color="unset"
          _hover={{ filter: "brightness(2)" }}
        >
          <RiTwitterFill size={28} />
        </Link>
      </Stack>
    </Stack>
  )
})

export default Bio

const staticQuery = graphql`
  fragment SocialMedia on File {
    data: childImageSharp {
      gatsbyImageData(width: 25, height: 25, layout: FIXED)
    }
  }

  query BioQuery {
    avatar: file(absolutePath: { regex: "/avatars/xetera.png/" }) {
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
    anilist {
      user {
        statistics {
          anime {
            count
          }
        }
      }
    }
    osu {
      user_id
      statistics {
        globalRank: global_rank
      }
    }
  }
`
