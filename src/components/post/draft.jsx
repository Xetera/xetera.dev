import { Flex, Text } from "@chakra-ui/layout"
import React from "react"

export const DraftDisclaimer = () => {
  return (
    <Flex
      zIndex={10}
      width="100%"
      mx="auto"
      background="barelyVisible"
      py={2}
      px={4}
      justifyContent="center"
      borderRadius="lg"
    >
      <Text
        fontSize={["sm", null, "lg"]}
        fontWeight="medium"
        color="text.500"
        textAlign="center"
      >
        You're previewing a draft. This post is not published.
      </Text>
    </Flex>
  )
}
