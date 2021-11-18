import React, { useContext, useRef } from "react"
import { Link } from "gatsby"
import { Box, Flex, Divider, Heading } from "@chakra-ui/layout"
import {
  RiMoonLine,
  RiSunFoggyLine,
  RiSpotifyFill,
  RiCodeBoxFill,
  RiGitRepositoryFill,
} from "react-icons/ri"
import { HiMusicNote } from "react-icons/hi"
import { transition } from "../data/theme"
import {
  Image,
  Text,
  Link as ChakraLink,
  Skeleton,
  SkeletonCircle,
} from "@chakra-ui/react"
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
      zIndex={100}
      bg="bg.100"
    >
      <Flex justify="flex-end" gridGap="1rem">
        <Flex justify="flex-start" align="center">
          <Link to="/" h="max-content">
            <Flex
              pointerEvents="all"
              alignItems="center"
              transition={transition}
            >
              <Flex
                w={["30px", "32px", "45px"]}
                h={["30px", "32px", "45px"]}
                justifyContent="center"
              >
                {lanyard.discord_user ? (
                  <Box position="relative" w="full">
                    <LazyImage
                      borderRadius="full"
                      src={`https://cdn.discordapp.com/avatars/${lanyard.discordId}/${lanyard.discord_user.avatar}.webp?size=80`}
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
        </Flex>
        {lanyard.spotify && <Divider borderColor="text.500" orientation="vertical" />}
        {/* Spotify */}
        {lanyard.spotify && (
          <Flex justify="flex-start" align="center">
            <Link to="/" h="max-content">
              <Flex
                pointerEvents="all"
                alignItems="center"
                transition={transition}
              >
                <Flex
                  w={["30px", "32px", "45px"]}
                  h={["30px", "32px", "45px"]}
                  justifyContent="center"
                >
                  {lanyard.spotify && (
                    <LazyImage
                      key={lanyard.spotify.album_art_url}
                      src={lanyard.spotify.album_art_url}
                    />
                  )}{" "}
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
                      {"Currently listening to"}
                    </Text>
                  </Flex>
                )}
                <Flex align="center" lineHeight={1}>
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
        )}
        {/* VSCode status https://cdn.discordapp.com/app-assets/${lanyard.vscodeStatus.application_id}/{lanyard.vscodeStatus.assets.small_image}.png */}
        {lanyard.vscodeStatus && <Divider borderColor="text.500" orientation="vertical" />}
        <Flex justify="flex-start" align="center">
          <Link to="/" h="max-content">
            <Flex
              pointerEvents="all"
              alignItems="center"
              transition={transition}
            >
              <Flex
                w={["30px", "32px", "45px"]}
                h={["30px", "32px", "45px"]}
                justifyContent="center"
              >
                {lanyard.vscodeStatus && (
                  <LazyImage
                    key={`https://cdn.discordapp.com/app-assets/${lanyard.vscodeStatus.application_id}/${lanyard.vscodeStatus.assets.large_image}.png`}
                    src={`https://cdn.discordapp.com/app-assets/${lanyard.vscodeStatus.application_id}/${lanyard.vscodeStatus.assets.large_image}.png`}
                  />
                )}{" "}
              </Flex>
            </Flex>
          </Link>
          {lanyard?.vscodeStatus && (
            <Flex
              justify="center"
              h="full"
              direction="column"
              marginInlineStart={2}
            >
              {lanyard.vscodeStatus && (
                <Flex align="center" color="text.100">
                  <RiCodeBoxFill />
                  <Text fontSize="xs" mx={2}>
                    {lanyard.vscodeStatus.details}
                  </Text>
                </Flex>
              )}
              <Flex align="center" lineHeight={1}>
                <Flex
                  display="flex"
                  fontSize="sm"
                  align="center"
                  color="text.300"
                >
                  {lanyard?.vscodeStatus ? (
                    <>
                      <RiGitRepositoryFill />
                      <ChakraLink
                        color="inherit"
                        rel="external noopener"
                        target="_blank"
                        href={`https://open.spotify.com/track/0`}
                      >
                        <Text
                          fontSize="xs"
                          mx={2}
                          maxWidth={["20ch", "40ch", "100%"]}
                          whiteSpace="nowrap"
                          textOverflow="ellipsis"
                          overflow="hidden"
                        >
                          {lanyard.vscodeStatus.state}
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
