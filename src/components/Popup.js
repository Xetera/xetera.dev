import React from "react"
import { m, AnimatePresence } from "framer-motion"
import { maxWidth } from "../templates/post"
import { Box, Flex } from "@chakra-ui/layout"

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
      className={`${className}`}
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
  const hovered = Boolean(jsx)
  const targetY =
    typeof window !== "undefined" && window.innerWidth > 600
      ? "-2.5rem"
      : "-1rem"
  return (
    <Box
      width="100%"
      position="fixed"
      className="w-screen fixed max-w-md"
      style={{ maxWidth: maxWidth }}
    >
      <AnimatePresence>
        {hovered && (
          <MotionFlex
            transition={{ type: "tween", duration: 0.24 }}
            initial={{
              opacity: 0,
              y: 0,
            }}
            animate={{
              opacity: 1,
              y: targetY,
            }}
            exit={{
              opacity: 0,
              y: 0,
            }}
            bottom="auto"
            alignItems="center"
            borderRadius="md"
            layerStyle="bgSecondary"
            position="absolute"
            mx={["auto"]}
            maxWidth="lg"
            py={3}
            px={4}
            className={`bottom-auto items-center flex popup bg-theme-dark rounded absolute py-3 px-4 text-blue-100 ${className} shadow-xl md:text-sm text-xs leading-normal md:max-w-lg max-w-full md:mx-auto mx-4 border-1 border-theme-alt border-solid`}
            style={{
              position: "fixed",
              bottom: "0",
              left: "0",
              right: "0",
              transform: "translateX(-50%)",
            }}
          >
            {jsx ?? "Oh no this toast isn't meant to be blank!"}
          </MotionFlex>
        )}
      </AnimatePresence>
    </Box>
  )
}

export function ToastImg({ src }) {
  return <img src={src} style={{ width: "30px" }} className="mr-2 mb-0" />
}
