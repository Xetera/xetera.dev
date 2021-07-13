import React from "react"
import ReactDOM from "react-dom"
import { m, AnimatePresence } from "framer-motion"
import { maxWidth } from "../shared"
import { Box, Flex } from "@chakra-ui/layout"
import { useBrandColor } from "../hooks/color"
import { forwardRef } from "@chakra-ui/react"

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
  console.log(location)
  if (!location) return null
  return ReactDOM.createPortal(children, location)
}

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
            width={["auto", null, "100%"]}
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
            borderTopRightRadius="md"
            borderBottomRightRadius="md"
            position="absolute"
            bottom={2}
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
