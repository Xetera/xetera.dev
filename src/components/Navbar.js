import React from "react"
import { Link } from "gatsby"
import { Box, Flex } from "@chakra-ui/layout"
import { RiArrowLeftFill, RiSunFoggyLine, RiMoonLine } from "react-icons/ri"
import { useColorMode } from "@chakra-ui/color-mode"
import { useLocation } from "@reach/router"
import { useBreakpointValue } from "@chakra-ui/media-query"

export default function Navbar() {
  const iconSize = useBreakpointValue([24, 26, 28])
  const location = useLocation()
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Flex
      justifyContent="space-between"
      width="100%"
      p={4}
      position="fixed"
      zIndex={100}
    >
      {location.pathname === "/" ? (
        <div />
      ) : (
        <Link to="/">
          <RiArrowLeftFill size={iconSize ?? 27} />
        </Link>
      )}
      <Box
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
    // <nav
    //   className="bg-theme-alt px-4 py-3 border-theme-light border-solid"
    //   style={{
    //     // I have no idea why I have to do this but I can't get it to only have
    //     // one border for some reason
    //     borderBottomWidth: "2px",
    //     borderTopWidth: "0",
    //     borderLeftWidth: "0",
    //     borderRightWidth: "0",
    //   }}
    // >
    //   <div className="flex justify-center max-w-screen-xl m-auto">
    //     <Link to="/" className="hover:no-underline" prefetch>
    //       <h1 className="margin-0 text-lg m-0 font-black text-blueGray-400 hover:text-blueGray-300 transition duration-300">
    //         {SITE_TITLE}
    //       </h1>
    //     </Link>
    //   </div>
    // </nav>
  )
}
