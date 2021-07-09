import React from "react"
import { m, AnimatePresence } from "framer-motion"
import { maxWidth } from "../templates/post"
import { Box, Flex } from "@chakra-ui/layout"
import { useBrandColor } from "../hooks/color"

export const ToastContext = React.createContext({
  jsx: null,
  setJsx: null,
})

export function Toastable({ text, children, className = "" }) {
  const { setJsx } = React.useContext(ToastContext)
  function onEnter() {
    setJsx(children)
  }
  function onLeave() {
    setJsx(null)
  }
  return (
    <Box
      as="span"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onTouchStart={onEnter}
      onTouchEnd={onLeave}
      textDecoration="underline"
      textDecorationStyle="wavy"
      cursor="pointer"
    >
      {text}
    </Box>
  )
}

const MotionFlex = m(Flex)

export default function Popup({ className }) {
  const { jsx } = React.useContext(ToastContext)
  const brand = useBrandColor()
  const hovered = Boolean(jsx)
  const targetY =
    typeof window !== "undefined" && window.innerWidth > 600 ? "-10vh" : "-10vh"
  return (
    <Flex
      position="fixed"
      justifyContent="center"
      // maxWidth="md"
      width="100%"
      bottom={2}
      left={0}
      right={0}
    >
      <AnimatePresence>
        {hovered && (
          <MotionFlex
            maxWidth={maxWidth}
            borderLeft={`2px solid ${brand}`}
            layerStyle="bgPrimary"
            transition={{ type: "tween", duration: 0.24 }}
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 10,
            }}
            bottom="auto"
            alignItems="center"
            borderRadius="md"
            position="absolute"
            bottom={2}
            mx={[4, null, "auto"]}
            maxWidth="lg"
            py={3}
            px={4}
            boxShadow="xl"
            className={`bottom-auto items-center flex popup bg-theme-dark rounded absolute py-3 px-4 text-blue-100 ${className} shadow-xl md:text-sm text-xs leading-normal md:max-w-lg max-w-full md:mx-auto mx-4 border-1 border-theme-alt border-solid`}
          >
            {jsx ?? "Oh no this toast isn't meant to be blank!"}
          </MotionFlex>
        )}
      </AnimatePresence>
    </Flex>
  )
}

export function ToastImg({ src }) {
  return <img src={src} style={{ width: "30px" }} className="mr-2 mb-0" />
}
