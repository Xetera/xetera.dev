import "./Popup.css"
import React from "react"
import { motion, AnimatePresence } from "framer-motion"

export const ToastContext = React.createContext({
  jsx: null,
  setJsx: null,
})

export function Toastable({ text, children, className = "" }) {
  const { setJsx } = React.useContext(ToastContext)
  console.log("rendering")
  function onEnter() {
    console.log("yes")
    setJsx(children)
  }
  function onLeave() {
    setJsx(null)
  }
  return (
    <span
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onTouchStart={onEnter}
      onTouchEnd={onLeave}
      className={`${className} cursor-pointer underline`}
      style={{ textDecorationStyle: "wavy" }}
    >
      {text}
    </span>
  )
}

export default function Popup({ className }) {
  const { jsx } = React.useContext(ToastContext)
  const hovered = Boolean(jsx)
  const targetY = window.innerWidth > 600 ? "-2.5rem" : "-1rem"
  return (
    <div className="w-screen fixed max-w-md" style={{ maxWidth: "42rem" }}>
      <AnimatePresence>
        {hovered && (
          <motion.div
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
            className={`bottom-auto flex popup bg-blue-900 rounded absolute py-3 px-4 text-blue-100 ${className} shadow-xl text-sm leading-normal md:max-w-md max-w-full md:mx-auto mx-4`}
            style={{
              position: "fixed",
              bottom: "0",
              left: "0",
              right: "0",
              transform: "translateX(-50%)",
            }}
          >
            {jsx ??
              "Angular is a really nice meme that is wrapped around another meme"}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
