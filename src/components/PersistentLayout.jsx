import React, { useState } from "react"
import { useMount } from "react-use"
import Lanyard from "./Lanyard"
import Navbar from "./Navbar"
import { Player } from "./Player/Player"

const PersistentLayout = ({ children }) => {
  const [mounted, setMounted] = useState(false)
  useMount(() => setMounted(true))

  const PlayerElem = mounted ? Player : "div"
  const LanyardWrapper = mounted ? Lanyard : "div"

  return (
    <LanyardWrapper>
      <Navbar />
      <PlayerElem />
      {children}
    </LanyardWrapper>
  )
}

export default PersistentLayout
