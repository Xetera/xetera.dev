import React, { Suspense, useMemo, useState } from "react"
import { useMount } from "react-use"
import Navbar from "./Navbar"
import Lanyard from "./Lanyard"

const Player = React.lazy(() =>
  import("./Player/Player").then(r => ({ default: r.Player }))
)

const PlayerLoader = React.memo(() => {
  const [mounted, setMounted] = useState(false)
  useMount(() => setMounted(true))

  if (!mounted) {
    return null
  }

  return (
    <Suspense fallback={<div />}>
      <Player />
    </Suspense>
  )
})

const PersistentLayout = ({ children }) => {
  return (
    <Lanyard>
      <Navbar />
      <PlayerLoader />
      {children}
    </Lanyard>
  )
}

export default React.memo(PersistentLayout)
