import React from "react"
import PersistentLayout from "../components/PersistentLayout"
import { StyleManager } from "./chakra"

export const wrapRootElement = ({ element }) => {
  return (
    <StyleManager>
      <PersistentLayout>{element}</PersistentLayout>
    </StyleManager>
  )
}
