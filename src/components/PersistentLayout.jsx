import React, { Suspense, useState } from "react"
import { useMount } from "react-use"
import Lanyard from "./Lanyard"
import Navbar from "./Navbar"

const Player = React.lazy(() =>
  import("./Player/Player").then(r => ({ default: r.Player }))
)

const PersistentLayout = ({ children }) => {
  const [mounted, setMounted] = useState(false)
  useMount(() => setMounted(true))

  const PlayerElem = mounted ? Player : "div"
  const LanyardWrapper = mounted ? Lanyard : "div"

  return (
    <LanyardWrapper>
      <Navbar />
      <Suspense fallback={<div />}>
        <Player />
      </Suspense>
      {children}
    </LanyardWrapper>
  )
}

export default PersistentLayout
