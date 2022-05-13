import React, { createContext, useContext, useState } from "react"
import { T } from "../Markdown"
import shuffle from "lodash/shuffle"
import { Box } from "@chakra-ui/layout"

export const defaultNames = [
  "Wendy",
  "Amy",
  "Lara",
  "Tiffany",
  "Jeniffer",
  "Kelly",
  "Liz",
]

export const ExContext = createContext({ name: defaultNames[0], next() {} })

export const ExContextWrapper = ({ children }) => {
  const [names, setNames] = useState(defaultNames)
  const [index, setIndex] = useState(0)

  function next() {
    if (index === names.length - 1) {
      setNames(shuffle(names))
      setIndex(0)
    } else {
      setIndex(prev => prev + 1)
    }
  }

  const name = names[index]

  return (
    <ExContext.Provider value={{ name, next }}>{children}</ExContext.Provider>
  )
}

export const Ex = () => {
  const { name, next } = useContext(ExContext)
  return (
    <T cursor="pointer" onClick={next} color="brandSecondary">
      {name}
    </T>
  )
}

export const ExShuffle = ({ children }) => {
  const { next } = useContext(ExContext)
  return (
    <Box
      as="span"
      onClick={next}
      whiteSpace="nowrap"
      textDecor="underline"
      fontStyle="italic"
      cursor="pointer"
      color="brandSecondary"
    >
      {children}
    </Box>
  )
}
