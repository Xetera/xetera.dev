import React, { useContext } from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { Box, Flex } from "@chakra-ui/layout"
import { RiSunFoggyLine, RiMoonLine } from "react-icons/ri"
import { useLocation } from "@reach/router"
import { useBreakpointValue } from "@chakra-ui/media-query"
import { transition } from "../data/theme"
import { motion } from "framer-motion"
import { AnimatePresence } from "framer-motion"
import { Text } from "@chakra-ui/react"
import { ThemeProvider } from "../data/themeProvider"
import { useLanyard } from "../hooks/lanyard"

const MotionText = motion(Text)

export default function Navbar() {
  const [hover, setHover] = React.useState(false)
  const { theme, setTheme, toggle } = useContext(ThemeProvider)
  const iconSize = useBreakpointValue([24, 26, 28])
  const location = useLocation()
  return (
    <Flex
      justifyContent="space-between"
      pointerEvents="none"
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
            pointerEvents="all"
            filter="saturate(1)"
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
                alt="home button"
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
        </Link>
      )}
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
          <RiMoonLine size={iconSize} />
        ) : (
          <RiSunFoggyLine size={iconSize} />
        )}
      </Box>
    </Flex>
  )
}
