import React from "react"
import { Grid, Flex, Text, Box, Link } from "@chakra-ui/layout"
import { Image } from "@chakra-ui/image"
import { graphql, useStaticQuery } from "gatsby"
import { SectionHeader } from "../Typography"
import { RiSpotifyFill } from "react-icons/ri"
import { StackedSection } from "../Layout"
import { forwardRef } from "@chakra-ui/system"
import { Skeleton } from "@chakra-ui/skeleton"
import groupBy from "lodash/groupBy"
import formatDistance from "date-fns/formatDistance"

export const SpotifyLikedSongs = forwardRef((props, ref) => {
  const res = useStaticQuery(QUERY)

  const tracksList = groupBy(res.liked.tracks.items, item => {
    const added = new Date(item.added_at)
    return `${added.getFullYear()}-${added.getMonth()}-${added.getDate()}`
  })

  return (
    <StackedSection ref={ref} {...props}>
      <Grid gap={8}>
        {Object.values(tracksList).map((tracks, i) => {
          const date = new Date(tracks[0].added_at)
          const dateHeader = formatDistance(date, new Date(), {
            addSuffix: true,
          })
          return (
            <Flex flexDirection="column" gap={3} key={i}>
              <Flex gap={3} alignItems="center">
                <Box minWidth="25px" h="1px" background="bg.300" />
                <Text
                  textTransform="uppercase"
                  whiteSpace="nowrap"
                  fontSize="xs"
                  fontWeight="medium"
                  letterSpacing="1.5px"
                  color="text.400"
                >
                  {dateHeader}
                </Text>
                <Box width="100%" h="1px" background="bg.300" />
              </Flex>
              <Grid gap={3} transition="all 0.4s">
                {tracks.map(item => (
                  <LikedSong key={item.track.id} track={item.track} />
                ))}
              </Grid>
            </Flex>
          )
        })}
      </Grid>
    </StackedSection>
  )
})

const LikedSong = ({ track }) => {
  const mediumImage = track.album.images.find(image => image.width <= 100)
  const firstArtist = track.artists[0]

  return (
    <Link
      href={`https://open.spotify.com/track/${track.id}`}
      target="_blank"
      overflow="hidden"
      transition="all 0.2s ease-in-out"
      borderRadius="md"
      borderWidth="1px"
      borderColor="transparent"
      aria-label="Go to song page on spotify"
      _hover={{
        background: "borderSubtle",
        borderColor: "bg.500",
        transform: "scale3d(1.02, 1.02, 1.02)",
      }}
      role="group"
    >
      <Flex cursor="pointer" overflow="hidden">
        <Image
          _groupHover={{
            borderTopRightRadius: "0px",
            borderBottomRightRadius: "0px",
          }}
          alt={`Album art for "${track.name}" by ${firstArtist.name}`}
          src={mediumImage?.url ?? "#"}
          htmlHeight="64px"
          htmlWidth="64px"
          width="64px"
          height="64px"
          fallback={<Skeleton width="64px" height="64px" />}
          fetchpriority="low"
          loading="lazy"
          minWidth="64px"
          borderRadius="md"
          overflow="hidden"
        />
        <Flex
          px={3}
          py={2}
          flexDirection="column"
          width="100%"
          overflow="hidden"
        >
          <Text
            textDecoration="none"
            color="text.200"
            whiteSpace="nowrap"
            fontWeight="medium"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            {track.name}
          </Text>
          <Text color="text.300">{firstArtist.name}</Text>
        </Flex>
      </Flex>
    </Link>
  )
}

const QUERY = graphql`
  query LikedTracks {
    liked: spotifyLikedTracks {
      tracks {
        items {
          added_at
          track {
            id
            href
            duration_ms
            artists {
              name
            }
            name
            album {
              name
              images {
                height
                url
                width
              }
              id
            }
          }
          added_at
        }
      }
    }
  }
`
