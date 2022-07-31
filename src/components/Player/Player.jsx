import React, { useCallback, useRef, useState } from "react"
import { useEffect } from "react"
import Cookie from "js-cookie"
import {
  usePlaybackState,
  usePlayerDevice,
  useSpotifyPlayer,
  WebPlaybackSDK,
} from "react-spotify-web-playback-sdk"
import { useWindowSize } from "react-use"
import { Box, Flex, HStack, Link, Text, VStack } from "@chakra-ui/layout"
import { Image } from "@chakra-ui/image"
import { Tooltip } from "@chakra-ui/tooltip"
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/slider"
import { Skeleton } from "@chakra-ui/skeleton"
import { useBoolean, useOutsideClick } from "@chakra-ui/hooks"
import {
  RiCloseLine,
  RiFolderMusicLine,
  RiLogoutBoxLine,
  RiPauseLine,
  RiPlayLine,
  RiSkipBackLine,
  RiSkipForwardLine,
  RiVolumeUpLine,
} from "react-icons/ri"
import { StaticImage } from "gatsby-plugin-image"
import { useLocalStorage } from "react-use"
import { AnimatePresence, m } from "framer-motion"
import { graphql, useStaticQuery } from "gatsby"
import throttle from "lodash/throttle"

/**
 * If you're looking at this file to figure out
 * how I did the player I'm so sorry it's messy
 * as hell and hard to follow :(
 */

const BUTTON_SIZE = 18

export const SPOTIFY_SCOPES = [
  "streaming",
  "user-modify-playback-state",
  "user-read-email",
  "user-read-private",
]

const MotionBox = m(Box)
const MotionFlex = m(Flex)

const redirectUri =
  process.env.NODE_ENV === "production"
    ? "https://xetera.dev/.netlify/functions/spotify"
    : "http://localhost:8008/.netlify/functions/spotify"
const clientId = "b376c65fb6ab4cf4af6648fffb308ddc"

const SPOTIFY_STATUS = "spotifyLoggedIn"

export function Player() {
  const token = useRef()
  const win = useWindowSize(900)
  const [authorized, setAuthorized] = useState(
    () => Cookie.get(SPOTIFY_STATUS) === "true"
  )
  const [volume, setVolume] = useLocalStorage("spotifyVolume", 0.3)
  const data = useStaticQuery(query)

  const getOAuthToken = useCallback(callback => {
    const tokenStr = Cookie.get(SPOTIFY_STATUS)

    if (!tokenStr) {
      return
    }
    if (token.current) {
      return callback(token.current)
    }
    refreshToken()
      .then(a => {
        callback(a)
      })
      .catch(() => {
        Cookie.remove(SPOTIFY_STATUS)
      })
  }, [])

  if (typeof window !== "undefined" && win.width < 990) {
    return null
  }

  function logout() {
    token.current = undefined
    Cookie.remove(SPOTIFY_STATUS)
    setAuthorized(false)
  }
  async function refresh() {
    return fetch("/.netlify/functions/spotify", {
      method: "PUT",
    }).then(r => r.json())
  }
  async function refreshToken() {
    return refresh().then(result => {
      if (result.error) {
        // TODO: error handling
        return
      }
      token.current = result.token
      setAuthorized(true)
      return result.token
    })
  }
  async function play(deviceId, tracks, offset) {
    return await fetch("https://api.spotify.com/v1/me/player/play", {
      method: "PUT",
      body: JSON.stringify({
        device_id: deviceId,
        uris: tracks,
        offset: {
          position: offset,
        },
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.current}`,
      },
    })
  }

  function login() {
    const params = new URLSearchParams({
      response_type: "code",
      client_id: clientId,
      scope: SPOTIFY_SCOPES.join(" "),
      redirect_uri: redirectUri,
      state: window.location,
    })
    window.location = `https://accounts.spotify.com/authorize?${params}`
  }

  return (
    <WebPlaybackSDK
      // we want this to re-render with all of its children
      // if the key ever changes
      key={authorized}
      deviceName="xetera.dev"
      getOAuthToken={getOAuthToken}
      connectOnInitialized={true}
      volume={volume}
    >
      <PlayerControls
        volume={volume}
        setVolume={setVolume}
        token={token}
        refreshToken={refreshToken}
        trackList={data.trackList}
        authorized={authorized}
        logout={logout}
        play={play}
        login={login}
      />
    </WebPlaybackSDK>
  )
}

const AlbumCover = ({ state }) => {
  const spot = (
    <StaticImage
      quality="100%"
      src="./spotify.png"
      placeholder="none"
      alt="Spotify logo"
    />
  )
  if (state.type === "ready") {
    return <Image src={state.src} objectFit="cover" />
  } else if (state.type === "notAuthorized") {
    return <Box p={3}>{spot}</Box>
  } else if (state.type === "timedOut") {
    return (
      <Box p={3} filter="grayscale(1)">
        {spot}
      </Box>
    )
  } else {
    return <Skeleton alignSelf="center" h="full" w="full" />
  }
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const PlayerControls = ({
  token,
  play,
  authorized,
  login,
  logout,
  trackList,
  volume,
  setVolume,
  refreshToken,
}) => {
  const inside = useRef()
  const mainPlayer = useRef()
  const [closed, setClosed] = useLocalStorage("playerClosed", true)
  const [trackListOpen, { toggle: toggleTrackList, off: closeTrackList }] =
    useBoolean(false)
  const [volumeOpen, { toggle: toggleVolume, off: closeVolume }] =
    useBoolean(false)
  const [timedOut, setTimedOut] = useState(false)
  const timeoutTimer = useRef()
  const playbackState = usePlaybackState(true, 100)
  const player = useSpotifyPlayer()
  const playerDevice = usePlayerDevice()
  const scrollerColor = "bgSecondary"

  useOutsideClick({
    ref: inside,
    handler: () => {
      closeTrackList()
      closeVolume()
    },
  })

  function takeControl() {
    if (playerDevice?.device_id === undefined) return console.log("no device")

    if (token.current) {
      // https://developer.spotify.com/documentation/web-api/reference/#endpoint-transfer-a-users-playback
      fetch(`https://api.spotify.com/v1/me/player`, {
        method: "PUT",
        body: JSON.stringify({
          device_ids: [playerDevice.device_id],
          play: false,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.current}`,
        },
      })
    }
  }
  async function playSong(offset, isRetry = false) {
    const res = await play(playerDevice.device_id, trackListUris, offset)
    if (!res.ok && res.status === 401) {
      if (isRetry) {
        console.log(
          `Attempted to retry playing a song after a token refresh and it failed again`
        )
        return
      }
      refreshToken().then(() => {
        playSong(offset, true)
      })
    }
  }
  function handleClick(e) {
    e.preventDefault()
    if (!authorized || timedOut) {
      login()
      return
    }
    // we don't want to handle clicks from the surrounding components
    if (e.target !== mainPlayer.current) {
      return
    }
    if (player) {
      player.togglePlay()
    }
  }
  useEffect(() => {
    if (!playbackState && !timeoutTimer.current) {
      timeoutTimer.current = setTimeout(() => {
        setTimedOut(true)
      }, 6000)
      return
    }
    if (playbackState && timeoutTimer.current) {
      clearTimeout(timeoutTimer.current)
    }
    if (playbackState && timedOut) {
      setTimedOut(false)
    }
  }, [Boolean(playbackState)])
  useEffect(takeControl, [playerDevice?.device_id, authorized])
  const trackListUris = trackList?.tracks.items.map(item => item.uri)

  const trackName = playbackState?.track_window.current_track.name
  const albumName = playbackState?.track_window.current_track.artists[0].name
  const albumArt = playbackState?.track_window.current_track.album.images[0].url
  const thisMonth = months[new Date().getMonth()]

  return (
    <>
      <AnimatePresence>
        {closed && (
          <MotionBox
            position="fixed"
            bottom={[2, null, 4, 8]}
            left={[2, null, 4, 8]}
            cursor="pointer"
            onClick={() => setClosed(false)}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            zIndex={2}
          >
            <Box
              background="bgSecondary"
              borderRadius="lg"
              p={2}
              h={10}
              w={10}
              className="spotify-button"
            >
              <StaticImage
                quality="100"
                alt="Spotify logo"
                src="./spotify.png"
                placeholder="none"
                style={{
                  filter: playbackState?.paused
                    ? "grayscale(1)"
                    : "grayscale(0)",
                }}
              />
            </Box>
          </MotionBox>
        )}
      </AnimatePresence>

      <MotionFlex
        ref={inside}
        position="fixed"
        bottom={[2, 4, 8]}
        left={[2, 4, 8]}
        alignItems="center"
        zIndex={8}
        variants={{
          closed: { y: 200 },
          open: { y: 0 },
        }}
        transition={{ stiffness: 50 }}
        initial="closed"
        animate={closed ? "closed" : "open"}
        exit="open"
        cursor="pointer"
      >
        <Flex
          alignItems="center"
          flexFlow="column"
          ref={mainPlayer}
          onClick={handleClick}
        >
          <Flex position="relative" width="300px" background="bgSecondary">
            <Flex
              position="absolute"
              bottom="-40px"
              top="-30px"
              borderRadius="sm"
              overflow="hidden"
              left="100%"
              pointerEvents={volumeOpen ? "auto" : "none"}
            >
              <MotionBox
                ml={1}
                height="100%"
                overflow="hidden"
                css={{
                  "&::-webkit-scrollbar": {
                    width: "8px",
                  },
                  "&::-webkit-scrollbar-track": {
                    width: "8px",
                  },
                }}
                display="flex"
                justifyContent="center"
                flexDirection="column"
                width="30px"
                background="bgSecondary"
                transition={{ type: "tween", duration: 0.3 }}
                variants={{
                  open: { x: 0, opacity: 1 },
                  closed: { x: -40, opacity: 0 },
                }}
                initial="closed"
                animate={volumeOpen ? "open" : "closed"}
              >
                <Text fontSize="xs" color="text.400" textAlign="center" pt={2}>
                  {Math.floor(volume * 100)}
                </Text>
                <Box p={2} h="full">
                  <Slider
                    height="100%"
                    orientation="vertical"
                    value={volume * 100}
                    onChange={e => setVolume(e / 100)}
                  >
                    <SliderTrack background="bg.100">
                      <SliderFilledTrack background="brand.100" />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </Box>
              </MotionBox>
            </Flex>
            <Box
              width="100%"
              position="absolute"
              bottom="100%"
              overflow="hidden"
              right={0}
              pointerEvents={trackListOpen ? "auto" : "none"}
            >
              <MotionBox
                background="bg.100"
                transition={{ type: "tween" }}
                variants={{
                  open: { y: 0 },
                  closed: { y: 700 },
                }}
                initial="closed"
                exit="closed"
                animate={trackListOpen ? "open" : "closed"}
              >
                <Flex
                  className="themed-scrollable"
                  maxHeight="600px"
                  overflowY="auto"
                  borderColor="borderSubtle"
                  borderWidth="1px"
                  spacing={4}
                  alignItems="flex-start"
                  overflowX="hidden"
                  flexFlow="column"
                >
                  {trackList.tracks.items.map((r, i) => {
                    // album images are sorted from biggest to smallest
                    const { images } = r.album
                    const albumArt = images[images.length - 1]
                    return (
                      <Flex
                        py={2}
                        px={3}
                        w="full"
                        key={r.uri}
                        _hover={{ background: scrollerColor }}
                        onClick={() => {
                          if (!authorized) {
                            return login()
                          }
                          if (timedOut || !playerDevice) {
                            return
                          }
                          playSong(i)
                        }}
                        alignItems="center"
                        background={
                          playbackState?.track_window.current_track.uri ===
                          r.uri
                            ? "bgSecondary"
                            : ""
                        }
                        filter={
                          timedOut || !authorized
                            ? "grayscale(1)"
                            : "grayscale(0)"
                        }
                      >
                        <Box
                          width={7}
                          whiteSpace="nowrap"
                          textAlign="right"
                          color="text.400"
                          fontSize="xs"
                          pr={3}
                        >
                          {i + 1}
                        </Box>
                        <Image
                          src={albumArt?.url}
                          alt={`Song: ${r.name}`}
                          h={8}
                          w={8}
                          marginInlineEnd={2}
                          loading="lazy"
                          // spotify CDN doesn't support HTTP2 and needs to be
                          // marked as low priority to prevent it from hogging
                          // precious bandwidth
                          fetchpriorit="low"
                        />
                        <VStack alignItems="flex-start" spacing={0}>
                          <Text
                            fontWeight="bold"
                            fontSize="sm"
                            lineHeight="1.2"
                          >
                            {r.name}
                          </Text>
                          <Text fontSize="xs" lineHeight="1.2">
                            {r.artists[0]?.name ?? "Unknown artist"}
                          </Text>
                        </VStack>
                      </Flex>
                    )
                  })}
                </Flex>
                <Text
                  as="h2"
                  textAlign="center"
                  width="65%"
                  ml={6}
                  mt={1}
                  py={2}
                  lineHeight="1.2"
                  fontSize="xs"
                  fontWeight="medium"
                  color="text.100"
                  letterSpacing="1.1px"
                  textTransform="uppercase"
                >
                  {thisMonth} favorites
                </Text>
              </MotionBox>
            </Box>
            <Flex
              position="absolute"
              bottom="100%"
              right={0}
              left={0}
              justifyContent="space-between"
            >
              {authorized ? (
                <Tooltip label="Logout">
                  <Flex
                    background="bgSecondary"
                    p={1}
                    mb={1}
                    borderRadius="sm"
                    onClick={logout}
                  >
                    <RiLogoutBoxLine size={BUTTON_SIZE} />
                  </Flex>
                </Tooltip>
              ) : (
                <Box />
              )}
              <HStack spacing={1} mb={1} justifyContent="flex-end">
                <AnimatePresence>
                  {!closed && (
                    <Tooltip
                      label={
                        trackListOpen ? "Hide tracklist" : "Show tracklist"
                      }
                    >
                      <MotionFlex
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ delay: 0.15, stiffness: 20 }}
                        background="bgSecondary"
                        p={1}
                        borderRadius="sm"
                        onClick={e => {
                          e.stopPropagation()
                          toggleTrackList()
                        }}
                      >
                        <RiFolderMusicLine size={BUTTON_SIZE} />
                      </MotionFlex>
                    </Tooltip>
                  )}
                </AnimatePresence>
                {authorized && (
                  <Tooltip label="Volume">
                    <MotionFlex
                      background="bgSecondary"
                      p={1}
                      borderRadius="sm"
                      onClick={e => {
                        e.stopPropagation()
                        toggleVolume()
                      }}
                    >
                      <RiVolumeUpLine size={BUTTON_SIZE} />
                    </MotionFlex>
                  </Tooltip>
                )}
                <AnimatePresence>
                  {!closed && (
                    <Tooltip label="Minimize">
                      <MotionFlex
                        background="bgSecondary"
                        p={1}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ delay: 0.3, stiffness: 20 }}
                        borderRadius="sm"
                        onClick={e => {
                          e.stopPropagation()
                          closeTrackList()
                          closeVolume()
                          setClosed(true)
                        }}
                      >
                        <RiCloseLine size={BUTTON_SIZE} />
                      </MotionFlex>
                    </Tooltip>
                  )}
                </AnimatePresence>
              </HStack>
            </Flex>
            <Flex
              w="70px"
              h="70px"
              overflow="hidden"
              maxWidth="100%"
              alignItems="center"
              justifyContent="center"
            >
              <AlbumCover
                state={
                  playbackState
                    ? { type: "ready", src: albumArt }
                    : !authorized
                    ? { type: "notAuthorized" }
                    : timedOut
                    ? { type: "timedOut" }
                    : { type: "waiting" }
                }
              />
            </Flex>
            <HStack marginInlineStart={1} p={2}>
              <VStack spacing={2} alignItems="flex-start" color="text.300">
                {trackName ? (
                  <Text
                    fontSize="sm"
                    fontWeight="bold"
                    lineHeight="1.2"
                    color="text.100"
                  >
                    {trackName}
                  </Text>
                ) : !authorized ? (
                  <Text fontSize="sm" fontWeight="bold" lineHeight="1.2">
                    Got Spotify premium?
                  </Text>
                ) : timedOut ? (
                  <Text fontSize="sm" fontWeight="bold" lineHeight="1">
                    Couldn't connect to Spotify
                  </Text>
                ) : (
                  <Skeleton height="15px" width="80px" />
                )}
                {albumName ? (
                  <Text fontSize="xs" lineHeight="1.2">
                    {albumName}
                  </Text>
                ) : !authorized ? (
                  <Text fontSize="xs" lineHeight="1">
                    Click to vibe to my playlists
                  </Text>
                ) : timedOut ? (
                  <Text fontSize="xs" lineHeight="1">
                    Click to re-authorize
                  </Text>
                ) : (
                  <Skeleton height="8px" width="30px" />
                )}
              </VStack>
            </HStack>
            {playbackState && (
              <Tooltip label="Track's Spotify page">
                <Link
                  p={1}
                  borderColor="borderSubtle"
                  right={2}
                  bottom={2}
                  w={7}
                  h={7}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://open.spotify.com/track/${playbackState.track_window.current_track.id}`}
                  position="absolute"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                >
                  <StaticImage
                    quality="100"
                    alt="Spotify logo"
                    src="./spotify.png"
                    placeholder="none"
                  />
                </Link>
              </Tooltip>
            )}
          </Flex>
          <Flex
            background="bgSecondary"
            mt={1}
            w="full"
            h="35px"
            position="relative"
            borderTopRadius="sm"
            alignItems="center"
            justifyContent="center"
          >
            {!authorized ? (
              <Text fontSize="xs" color="text.400">
                This widget connects to your Spotify account
              </Text>
            ) : timedOut ? (
              <Text fontSize="xs" color="text.300">
                Maybe change devices in your Spotify app?
              </Text>
            ) : playbackState ? (
              <HStack py={1}>
                <Box
                  p={1}
                  borderColor="borderSubtle"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  onClick={() => player?.previousTrack()}
                >
                  {!playbackState?.disallows.skipping_prev && (
                    <RiSkipBackLine size={BUTTON_SIZE} />
                  )}
                </Box>
                <Box
                  p={1}
                  borderColor="borderSubtle"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  onClick={() => player?.togglePlay()}
                >
                  {!playbackState && (
                    <Skeleton
                      height={BUTTON_SIZE}
                      width={BUTTON_SIZE}
                      borderRadius="lg"
                    />
                  )}
                  {playbackState?.disallows.resuming && (
                    <RiPauseLine size={BUTTON_SIZE} />
                  )}
                  {playbackState?.disallows.pausing && (
                    <RiPlayLine size={BUTTON_SIZE} />
                  )}
                </Box>
                <Box
                  p={1}
                  borderColor="borderSubtle"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  onClick={() => player?.nextTrack()}
                >
                  {!playbackState?.disallows.skipping_next && (
                    <RiSkipForwardLine size={BUTTON_SIZE} />
                  )}
                </Box>
              </HStack>
            ) : (
              <Skeleton w="full" h="35px" />
            )}
            {playbackState && (
              <Seeker
                position={playbackState.position}
                duration={playbackState.duration}
                seek={e => player.seek(e)}
              />
            )}
          </Flex>
        </Flex>
      </MotionFlex>
    </>
  )
}

const Seeker = ({ seek, position, duration }) => {
  const [trackHover, { on: trackHoverOn, off: trackHoverOff }] =
    useBoolean(false)
  const [trackDrag, { on: trackDragOn, off: trackDragOff }] = useBoolean(false)

  const doSeek = useRef(throttle(seek, 100)).current

  return (
    <Box
      w="full"
      position="absolute"
      mt={1}
      top="100%"
      onMouseEnter={trackHoverOn}
      onMouseLeave={trackHoverOff}
      onMouseDown={trackDragOn}
      onMouseUp={trackDragOff}
    >
      <Slider
        value={position}
        max={duration}
        onChange={doSeek}
        display="block"
        h="3px"
      >
        <SliderTrack background="bgSecondary">
          <SliderFilledTrack background="brand.100" />
        </SliderTrack>
        <SliderThumb
          opacity={trackHover || trackDrag ? "1" : "0"}
          transition="opacity 0.4s ease-in-out"
        />
      </Slider>
    </Box>
  )
}

const query = graphql`
  query SpotifyTopTracks {
    trackList: spotifyTopTracks {
      tracks {
        items {
          uri
          name
          external_urls {
            spotify
          }
          artists {
            name
          }
          album {
            images {
              url
            }
          }
        }
      }
    }
  }
`
