import React from "react"
import { useState } from "react"
import { useMount } from "react-use"
import Lanyard from "./Lanyard"
import Navbar from "./Navbar"
import { Player } from "./Player/Player"

const PersistentLayout = ({ children, data }) => {
  const [mounted, setMounted] = useState(false)
  useMount(() => setMounted(true))
  const PlayerElem = mounted ? Player : "div"
  return (
    <Lanyard discordId={data.siteMetadata.social.discordId}>
      <Navbar />
      <PlayerElem />
      {children}
    </Lanyard>
  )
}

export default PersistentLayout
