import { Flex, Text } from "@chakra-ui/layout"
import { Alert } from "@chakra-ui/alert"
import { Tag } from "@chakra-ui/tag"
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
      <Text fontSize={["sm", null, "lg"]} fontWeight="medium" color="text.500">
        You're previewing a draft. This post is not published.
      </Text>
    </Flex>
  )
}
