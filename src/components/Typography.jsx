import React from "react"
import { Text, Flex } from "@chakra-ui/layout"
import { forwardRef } from "@chakra-ui/system"
import { transition } from "../data/theme"

export const SectionHeader = ({ children }) => {
  return (
    <Text
      fontSize="sm"
      color="text.300"
      textTransform="uppercase"
      letterSpacing="1.5px"
      fontWeight="medium"
    >
      {children}
    </Text>
  )
}

export const T = forwardRef(({ children, ...rest }, ref) => {
  return (
    <Flex
      display="inline-flex"
      as="span"
      color="brand.100"
      fontFamily="'Sriracha', 'Wotfard', serif"
      transition={transition}
      ref={ref}
      {...rest}
    >
      {children}
    </Flex>
  )
})
