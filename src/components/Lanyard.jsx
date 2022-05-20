import { useStaticQuery, graphql } from "gatsby"
import React from "react"
import { LanyardProvider } from "../data/providers"
import { useLanyard } from "../hooks/lanyard"

const xeteraId = "140862798832861184"

const Lanyard = ({ children }) => {
  const lanyard = useLanyard(xeteraId)

  return (
    <LanyardProvider.Provider value={lanyard}>
      {children}
    </LanyardProvider.Provider>
  )
}
export default Lanyard
