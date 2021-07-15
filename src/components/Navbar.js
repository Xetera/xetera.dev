import React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { Box, Flex } from "@chakra-ui/layout"
import { RiSunFoggyLine, RiMoonLine } from "react-icons/ri"
import { useColorMode } from "@chakra-ui/color-mode"
import { useLocation } from "@reach/router"
import { useBreakpointValue } from "@chakra-ui/media-query"
import { transition } from "../@chakra-ui/gatsby-plugin/theme"
import { motion } from "framer-motion"
import { AnimatePresence } from "framer-motion"
import { Text } from "@chakra-ui/react"

const MotionText = motion(Text)

export default function Navbar() {
  const [hover, setHover] = React.useState(false)
  const [position, setPosition] = React.useState(0)
  const scrollHandler = React.useCallback(() => {
    setPosition(window.scrollY)
  }, [])
  React.useEffect(() => {
    document.addEventListener("scroll", scrollHandler)
    return () => document.removeEventListener("scroll", scrollHandler)
  }, [])
  const shouldOverrideBackground = useBreakpointValue([true, null, null, false])
  const pinned = position === 0
  const iconSize = useBreakpointValue([24, 26, 28])
  const location = useLocation()
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Flex
      justifyContent="space-between"
      width="100%"
      transition={transition}
      p={2}
      position="fixed"
      zIndex={100}
    >
      {location.pathname === "/" ? (
        <div />
      ) : (
        <Link to="/">
          <Flex
            filter={pinned ? "saturate(0.3)" : "saturate(1)"}
            _hover={{ filter: "saturate(1)" }}
            p={2}
            alignItems="center"
            transition={transition}
          >
            <Box
              w={["26px", null, null, "30px"]}
              opacity={[0.7, null, null, 1]}
            >
              <StaticImage
                src="../../content/assets/favicon.png"
                aria-label="home button"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                width={30}
                placeholder="tracedSVG"
                quality={100}
              />
            </Box>
            <AnimatePresence>
              {hover && (
                <MotionText
                  ml={3}
                  fontWeight="semibold"
                  transition={{ type: "tween" }}
                  animate={{ x: 0, opacity: 1 }}
                  initial={{ x: -15, opacity: 0 }}
                  exit={{ x: -15, opacity: 0 }}
                >
                  Home
                </MotionText>
              )}
            </AnimatePresence>
          </Flex>
          {/* <RiArrowLeftFill size={iconSize ?? 26} /> */}
        </Link>
      )}
      <Box
        p={2}
        onClick={toggleColorMode}
        cursor="pointer"
        as="button"
        aria-label="theme switch"
      >
        {colorMode === "light" ? (
          <RiMoonLine size={iconSize} />
        ) : (
          <RiSunFoggyLine size={iconSize} />
        )}
      </Box>
    </Flex>
  )
}
