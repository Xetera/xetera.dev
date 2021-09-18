import React from "react"
import ReactDOM from "react-dom"
import { AnimatePresence, m } from "framer-motion"
import { maxWidth } from "../shared"
import { Box, Flex } from "@chakra-ui/layout"
import { forwardRef } from "@chakra-ui/react"
import { transition } from "../data/theme"

export const ToastContext = React.createContext({
  jsx: null,
  setJsx: null,
})

export const Toastable = forwardRef(({ text, children, ...rest }, ref) => {
  const [hovering, setHovering] = React.useState(null)
  const { setJsx } = React.useContext(ToastContext)

  function onEnter() {
    setJsx(children)
  }

  function onLeave() {
    setJsx(false)
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
      ref={ref}
      {...rest}
    >
      {text}
    </Box>
  )
})

const MotionFlex = m(Flex)

export function PopupPortal({ children }) {
  const [location, setLocation] = React.useState(null)
  React.useEffect(() => {
    setLocation(document.querySelector("#___gatsby"))
  }, [])
  if (!location) return null
  return ReactDOM.createPortal(children, location)
}

export default function Popup({ className }) {
  const { jsx } = React.useContext(ToastContext)
  const hovered = Boolean(jsx)
  const targetY =
    typeof window !== "undefined" && window.innerWidth > 600 ? "-10vh" : "-10vh"
  return (
    <Flex
      position="fixed"
      justifyContent="center"
      display="flex"
      zIndex={0}
      alignItems="center"
      maxHeight="40vh"
      height="100%"
      pointerEvents="none"
      transition={transition}
      backgroundPosition={hovered ? "100px" : "0"}
      opacity={hovered ? 1 : 0}
      background="bgPopupShadow"
      width="100%"
      bottom={0}
      left={0}
      right={0}
    >
      <AnimatePresence>
        {hovered && (
          <MotionFlex
            maxWidth={maxWidth}
            width={["auto", null, "100%"]}
            borderLeft={`2px solid`}
            borderColor="brand"
            background="bgPrimary"
            transition={{ type: "tween", duration: 0.24 }}
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 25,
            }}
            alignItems="center"
            borderTopRightRadius="md"
            borderBottomRightRadius="md"
            position="absolute"
            bottom={[4, null, null, 8]}
            left={4}
            right={4}
            mx={"auto"}
            maxWidth="lg"
            py={3}
            px={4}
            boxShadow="xl"
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
