import React from "react"
import { PlayerWrapper } from "../components/Player/Player"
import { StyleManager } from "./chakra"

export const wrapRootElement = ({ element }) => {
  return (
    <StyleManager>
      <PlayerWrapper element={element} />
    </StyleManager>
  )
}
