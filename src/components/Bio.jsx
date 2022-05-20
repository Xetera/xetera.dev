import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import ExternalLink from "./ExternalLink"
import { Flex, Heading, Link, Box, Stack, Text, Grid } from "@chakra-ui/layout"
import { RiGithubFill, RiSafariLine, RiTwitterFill } from "react-icons/ri"
import { forwardRef } from "@chakra-ui/system"
import { Hr } from "./Layout"
import { m } from "framer-motion"
import { useIsSafari } from "../hooks/is-safari"
import { T } from "@src/components/Typography"
import { XeteraMedium } from "./Avatars"

const MotionFlex = m(Flex)

const Employment = React.memo(({ job, position, link }) => (
  <Text>
    I'm currently <T>{position}</T> at{" "}
    <Link href={link} rel="external nofollower noopener" color="brandSecondary">
      {job}
    </Link>
  </Text>
))

const BioImage = React.memo(() => (
  <Box role="group" height="min-content">
    <Box
      position="relative"
      zIndex={1}
      overflow="hidden"
      maxWidth="340px"
      height="min-content"
      borderRadius="lg"
    >
      <XeteraMedium />
    </Box>
    <Text
      zIndex={-1}
      transition="all 0.4s"
      opacity="0"
      transform="translateY(-40px)"
      _groupHover={{
        opacity: "1",
        transform: "translateY(0px)",
      }}
      color="text.500"
      fontWeight="light"
      mt={3}
      marginInlineStart={3}
      fontSize="xs"
    >
      ☝️ Avatar by{" "}
      <ExternalLink href="https://twitter.com/_arttella" color="brand.100">
        @Arttella
      </ExternalLink>
    </Text>
  </Box>
))

const Bio = React.memo(() => {
  const data = useStaticQuery(staticQuery)
  const { isSafari } = useIsSafari()

  const twitter = data.site.siteMetadata.social.twitter
  return (
    <Grid
      gap={8}
      as="section"
      gridTemplateAreas={{
        base: `
        "bio"
        "avatar"
      `,
        lg: "'bio avatar'",
      }}
    >
      <Stack
        lineHeight="200%"
        spacing={4}
        gridArea="bio"
        flex={1}
        maxWidth="42rem"
      >
        <Heading
          fontWeight="black"
          fontSize={{ base: "3xl", lg: "7xl" }}
          color="text.100"
        >
          Hi, I’m Xetera.
        </Heading>
        <Stack spacing={4} fontSize={{ base: "md", lg: "2md" }}>
          <Text>
            I love making ideas come to life with code. I'm a huge fan of
            functional programming and anti-abuse + trust & safety.
          </Text>
          <Text>
            I'm currently really interested in web automation and security. I
            also enjoy design and writing on the side when I can find the time.
          </Text>
          <Employment
            position="a full-stack developer"
            link="https://top.gg"
            job="Top.gg"
          />
          <Text>
            As of{" "}
            <Text as="time" dateTime={data.site.buildtime} color="text.400">
              {data.site.buildTime}
            </Text>{" "}
            I have watched{" "}
            <ExternalLink
              color="brandSecondary"
              href="https://anilist.co/user/Xetera"
            >
              {data.anilist.user.statistics.anime.count} animes
            </ExternalLink>
          </Text>
        </Stack>
        <Stack spacing={4} direction="row">
          <Link
            href="https://github.com/xetera"
            color="unset"
            _hover={{ color: "text.100" }}
            aria-label="github link"
          >
            <RiGithubFill size={28} />
          </Link>
          <Link
            href={`https://twitter.com/${twitter}`}
            color="unset"
            _hover={{ color: "text.100" }}
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
                <Text color="text.400" fontSize="sm">
                  It looks like you're using an outdated browser that can't keep
                  up with web standards. Some functionality on the site might
                  feel a little broken, sorry. 😭
                </Text>
              </Flex>
            </MotionFlex>
          </>
        )}
      </Stack>
      <Flex
        gridArea="avatar"
        justifyContent={{ base: "flex-start", lg: "flex-end" }}
      >
        <BioImage />
      </Flex>
    </Grid>
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
  }
`
