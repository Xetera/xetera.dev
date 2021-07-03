import React from "react"
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react"
import { postPreviewDimensions } from "../shared"
import avatar from "@assets/avatars/xetera.png"
import { useBrandColor } from "../hooks/color"

export default function StaticPreview({ pageContext, image = avatar }) {
  const { title, description } = pageContext

  const width = `${postPreviewDimensions.width}px`
  const height = `${postPreviewDimensions.height}px`
  return (
    <Flex
      position="relative"
      overflow="hidden"
      background="gray.900"
      mx="auto"
      width={width}
      height={height}
      position="relative"
    >
      <Flex
        backgroundImage="radial-gradient(circle at 6px 24px, #404458 1%, transparent 1%),radial-gradient(circle at 47px 53px, #3f4356 1%, transparent 1%)"
        backgroundSize="79px 60px"
        flex={1}
      >
        <Flex
          mx="auto"
          maxWidth="80%"
          alignItems="center"
          flexFlow="column"
          justifyContent="center"
          textAlign="center"
          position="static"
          zIndex={1}
        >
          <Heading fontSize="6xl" fontWeight="black" mb={3}>
            {title}
          </Heading>
          <Text fontSize="2xl" fontWeight="medium" color="#e0e0e0">
            {description}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
