import React, { Suspense, useState } from "react"
import { useMount } from "react-use"
import Navbar from "./Navbar"

const Lanyard = React.lazy(() => import("./Lanyard"))

const Player = React.lazy(() =>
  import("./Player/Player").then(r => ({ default: r.Player }))
)

const PersistentLayout = ({ children }) => {
  const [mounted, setMounted] = useState(false)
  useMount(() => setMounted(true))

  const LanyardWrapper = mounted ? Lanyard : "div"
  const content = (
    <>
      <Navbar />
      {mounted && (
        <Suspense fallback={<div />}>
          <Player />
        </Suspense>
      )}
      {children}
    </>
  )

  return !mounted ? (
    content
  ) : (
    <Suspense fallback={content}>
      <LanyardWrapper>{content}</LanyardWrapper>
    </Suspense>
  )
}

export default PersistentLayout
