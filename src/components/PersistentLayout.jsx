import React from "react"
import { useState } from "react"
import { useMount } from "react-use"
import Lanyard from "./Lanyard"
import Navbar from "./Navbar"
import { Player } from "./Player/Player"

const PersistentLayout = ({ element }) => {
  const [mounted, setMounted] = useState(false)
  useMount(() => setMounted(true))
  const PlayerElem = mounted ? Player : "div"
  return (
    <Lanyard>
      <Navbar />
      <PlayerElem />
      {element}
    </Lanyard>
  )
}

export default PersistentLayout
