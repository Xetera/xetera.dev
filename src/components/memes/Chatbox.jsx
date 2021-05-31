import { Box, Flex, Grid, Text } from "@chakra-ui/layout"
import React from "react"

const whatsappBackground = "#262d31"
const whatsappBackgroundSelf = "rgb(5, 97, 98)"

export function WhatsappMessage({
  other = false,
  number,
  username,
  color,
  messages = [],
  time,
}) {
  const [head, ...tail] = messages
  const textStyle = {
    color: "rgba(241, 241, 241, 0.9)",
  }
  const bubbleColor = other ? whatsappBackground : whatsappBackgroundSelf
  const timeComp = (
    <Text
      as="time"
      display="inline-block"
      alignSelf="flex-end"
      m="-10px 0 -5px 12px"
      fontSize="xs"
      whiteSpace="nowrap"
      color="rgba(241, 241, 241, 0.6)"
    >
      {time}
    </Text>
  )
  return (
    <Grid
      alignSelf={other ? "flex-start" : "flex-end"}
      gap={1}
      opacity="100%"
      maxWidth="330px"
      lineHeight="19px"
      fontSize="sm"
    >
      <Flex
        background={bubbleColor}
        padding="6px 7px 8px 9px"
        p={2}
        flexFlow="column"
        position="relative"
        {...(other ? { borderRightRadius: "lg" } : { borderLeftRadius: "lg" })}
        borderBottomRadius="lg"
      >
        <Box
          as="svg"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          position="absolute"
          {...(other ? { right: "100%" } : { left: "100%" })}
          top={0}
          width="10px"
          height="10px"
          fill={other ? whatsappBackground : whatsappBackgroundSelf}
        >
          {other ? (
            <polygon points="0,0 10,0 10,10" />
          ) : (
            <polygon points="10,0 0,10 0,0" />
          )}
        </Box>
        {username && (
          <Flex mb={1} className="flex mb-1">
            <Text color={color} fontWeight="semibold" mr={2} lineHeight="19px">
              {number}
            </Text>
            <Text color="rgba(241,241,242, 0.4)" lineHeight="19px">
              ~{username}
            </Text>
          </Flex>
        )}
        <Flex justifyContent="space-between">
          <Text m={0} {...textStyle} lineHeight="19px">
            {head}
          </Text>
          {timeComp}
        </Flex>
      </Flex>
      {tail.map(message => (
        <Flex
          background={bubbleColor}
          p="6px 7px 8px 9px"
          position="relative"
          width="min-content"
          whiteSpace="nowrap"
          borderRadius="md"
        >
          <Text m={0} lineHeight="19px" color={textStyle.color}>
            {message}
          </Text>
          {timeComp}
        </Flex>
      ))}
    </Grid>
  )
}
