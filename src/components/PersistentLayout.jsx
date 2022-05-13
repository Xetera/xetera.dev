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
  const isSsr = typeof window === "undefined"

  const LanyardWrapper = mounted ? Lanyard : "div"

  return (
    <LanyardWrapper>
      <Navbar />
      {!isSsr && (
        <Suspense fallback={<div />}>
          <Player />
        </Suspense>
      )}
      {children}
    </LanyardWrapper>
  )
}

export default PersistentLayout
