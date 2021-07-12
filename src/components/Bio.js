import React from "react"
import ExternalLink from "./ExternalLink"
import { GatsbyImage } from "gatsby-plugin-image"
import { useStaticQuery, graphql } from "gatsby"
import { Box, Flex, Grid, Heading, Link, Stack, Text } from "@chakra-ui/layout"
// import { Image } from "@chakra-ui/image"
import {
  RiGithubFill,
  RiGithubLine,
  RiSafariFill,
  RiSafariLine,
  RiTwitterFill,
} from "react-icons/ri"
import { forwardRef } from "@chakra-ui/system"
import { useBrandColor, useBrandSecondaryColor } from "../hooks/color"
import { Hr } from "./Layout"
import { m } from "framer-motion"

const MotionFlex = m(Flex)

const Bio = React.memo(
  forwardRef((props, ref) => {
    const data = useStaticQuery(staticQuery)
    const [isSafari, setSafari] = React.useState(false)
    React.useEffect(() => {
      var ua = navigator.userAgent.toLowerCase()
      setSafari(ua.includes("safari") && !ua.includes("chrome"))
    }, [])

    const osuRank = Intl.NumberFormat("default").format(
      data.osu.statistics.globalRank
    )
    const brand = useBrandColor()
    const brandSecondary = useBrandSecondaryColor()
    const image = React.useMemo(
      () => (
        <Flex
          borderRadius="md"
          overflow="hidden"
          borderColor={brandSecondary}
          width="min-content"
          mb={2}
        >
          <GatsbyImage
            image={data.avatar.data.gatsbyImageData}
            alt="Avatar image"
          />
        </Flex>
      ),
      [brandSecondary]
    )
    return (
      <>
        <Stack lineHeight="1.7" spacing={4} ref={ref} {...props}>
          {image}
          <Heading fontWeight="black" fontSize="3xl">
            Hi, I’m Xetera.
          </Heading>
          <Stack spacing={4} fontSize="16px">
            <Text>
              I'm currently a full-stack developer at{" "}
              <Link
                href="https://top.gg"
                rel="external nofollower noopener"
                color={brandSecondary}
              >
                Top.gg
              </Link>
              . I like to wear many hats when necessary and make cool ideas come
              to life.
            </Text>
            <Text>
              I’m a simp for functional programming and anti-abuse trust &
              safety. I also enjoy design and writing on the side when I can
              find the time.
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
                color={brandSecondary}
                href="https://anilist.co/user/Xetera"
                rel="noopener external noreferrer"
              >
                {data.anilist.user.statistics.anime.count} animes
              </Link>{" "}
              and I’m rank{" "}
              <Link
                color={brandSecondary}
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
              _hover={{ color: brand }}
              aria-label="github link"
            >
              <RiGithubFill size={28} />
            </Link>
            <Link
              href="https://twitter.com/_Xetera"
              color="unset"
              _hover={{ color: brand }}
              aria-label="twitter link"
            >
              <RiTwitterFill size={28} />
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
                <Flex flexFlow="column" position="sticky" top={6}>
                  <Heading
                    as="h4"
                    fontSize="lg"
                    mb={2}
                    layerStyle="textSecondary"
                  >
                    <RiSafariLine
                      size={20}
                      style={{
                        display: "inline",
                        verticalAlign: "bottom",
                        marginRight: "8px",
                      }}
                    />
                    Oh no
                  </Heading>
                  <Text layerStyle="textTertiary" fontSize="sm">
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
