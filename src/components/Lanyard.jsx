import React from "react"
import { LanyardProvider } from "../data/providers"
import { useLanyard } from "../hooks/lanyard"

const Lanyard = ({ children }) => {
  const lanyard = useLanyard()
  return (
    <LanyardProvider.Provider value={lanyard}>
      {children}
    </LanyardProvider.Provider>
  )
}
export default Lanyard
