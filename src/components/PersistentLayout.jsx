import React, { useState } from "react"
import { useMount } from "react-use"
import Lanyard from "./Lanyard"
import Navbar from "./Navbar"

const PersistentLayout = ({ children }) => {
  const [mounted, setMounted] = useState(false)
  useMount(() => setMounted(true))

  const LanyardWrapper = mounted ? Lanyard : "div"

  return (
    <LanyardWrapper>
      <Navbar />
      {children}
    </LanyardWrapper>
  )
}

export default PersistentLayout
