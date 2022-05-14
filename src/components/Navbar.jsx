import React, { useContext, useRef } from "react"
import { Link } from "gatsby"
import { Box, Flex } from "@chakra-ui/layout"
import { RiMoonLine, RiSunFoggyLine, RiSpotifyFill } from "react-icons/ri"
import { HiMusicNote } from "react-icons/hi"
import { transition } from "../data/theme"
import { Text, Link as ChakraLink } from "@chakra-ui/layout"
import { Image } from "@chakra-ui/image"
import { Skeleton, SkeletonCircle } from "@chakra-ui/skeleton"
import { LanyardProvider, ThemeProvider } from "../data/providers"
import Headroom from "react-headroom"

const colors = {
  online: "hsl(139, 47.3%, 43.9%)",
  idle: "hsl(38, 95.7%, 54.1%)",
  offline: "hsl(214, 9.9%, 50.4%)",
  dnd: "hsl(359, 82.6%, 59.4%)",
}

const LazyImage = ({ src, ...rest }) => {
  const imageRef = useRef()
  const [loaded, setLoaded] = React.useState(false)
  React.useEffect(() => {
    if (!loaded && imageRef.current?.complete) {
      setLoaded(true)
    }
  }, [src])

  return (
    <Skeleton isLoaded={loaded} h="full">
      <Image
        borderRadius="sm"
        w="full"
        h="full"
        ref={imageRef}
        onError={() => setLoaded(false)}
        onLoad={() => setLoaded(true)}
        src={src}
        {...rest}
      />
    </Skeleton>
  )
}

export default function Navbar() {
  const { theme, setTheme, toggle } = useContext(ThemeProvider)
  const lanyard = useContext(LanyardProvider)

  const nav = (
    <Flex
      as="nav"
      justifyContent="space-between"
      width="100%"
      transition={transition}
      p={3}
      backdropFilter={{ base: "blur(8px); opacity(0.1)", xl: "none" }}
      zIndex={100}
    >
      <Flex justify="flex-start" align="center">
        <Link to="/" aria-label="Go back home">
          <Flex pointerEvents="all" alignItems="center" transition={transition}>
            <Flex
              w={["30px", "32px", "50px"]}
              h={["30px", "32px", "50px"]}
              justifyContent="center"
            >
              {lanyard.spotify ? (
                <LazyImage
                  alt={`${lanyard.spotify.artist} - ${lanyard.spotify.song}`}
                  key={lanyard.spotify.album_art_url}
                  src={lanyard.spotify.album_art_url}
                />
              ) : lanyard.discord_user ? (
                <Box position="relative" w="full">
                  <LazyImage
                    borderRadius="full"
                    alt={`Avatar of ${
                      lanyard.discord_user?.username ?? "Unknown user"
                    }`}
                    src={`https://cdn.discordapp.com/avatars/${lanyard.discordId}/${lanyard.discord_user.avatar}.webp?size=256`}
                  />
                  <Box
                    position="absolute"
                    borderWidth={["3px", "3px", null, "4px"]}
                    borderColor="bg.100"
                    right={-1}
                    bottom={-1}
                    borderRadius="full"
                    bg={colors[lanyard?.discord_status ?? "offline"]}
                    w={["13px", "15px", null, "20px"]}
                    h={["13px", "15px", null, "20px"]}
                  />
                </Box>
              ) : (
                <SkeletonCircle w="full" h="full" />
              )}
            </Flex>
          </Flex>
        </Link>
        {lanyard?.spotify && (
          <Flex
            justify="center"
            h="full"
            direction="column"
            marginInlineStart={2}
          >
            {lanyard.spotify && (
              <Flex align="center" color="text.100">
                <RiSpotifyFill />
                <Text fontSize="xs" mx={2}>
                  {"I'm listening to"}
                </Text>
              </Flex>
            )}
            <Flex align="center">
              <Flex
                display="flex"
                fontSize="sm"
                align="center"
                color="text.300"
              >
                {lanyard?.spotify ? (
                  <>
                    <HiMusicNote />
                    <ChakraLink
                      color="inherit"
                      rel="external noopener"
                      target="_blank"
                      href={`https://open.spotify.com/track/${lanyard.spotify.track_id}`}
                    >
                      <Text
                        fontSize="xs"
                        mx={2}
                        maxWidth={["20ch", "40ch", "100%"]}
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                        overflow="hidden"
                      >
                        {lanyard.spotify.artist} - {lanyard.spotify.song}
                      </Text>
                    </ChakraLink>
                  </>
                ) : (
                  <>
                    {/* <Text fontSize="xs" mx={2}>
                      I'm on Discord doing nothing
                    </Text> */}
                  </>
                )}
              </Flex>
            </Flex>
          </Flex>
        )}
      </Flex>
      <Box
        p={2}
        color="text.100"
        onClick={() => setTheme(toggle)}
        cursor="pointer"
        as="button"
        pointerEvents="all"
        aria-label="theme switch"
      >
        {theme === "light" ? (
          <RiMoonLine size={30} />
        ) : (
          <RiSunFoggyLine size={30} />
        )}
      </Box>
    </Flex>
  )
  return <Headroom>{nav}</Headroom>
}
