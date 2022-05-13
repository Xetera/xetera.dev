import { Box, Flex, Grid, Text } from "@chakra-ui/layout"
import { VStack } from "@chakra-ui/layout"
import { forwardRef } from "@chakra-ui/system"
import React from "react"
import WhatsappBackground from "@assets/whatsapp_background.png"

const whatsappBackground = "#262d31"
const whatsappBackgroundSelf = "rgb(5, 97, 98)"

export const WhatsappContainer = forwardRef((props, ref) => {
  return (
    <Box
      width="100vw"
      position="relative"
      mb={6}
      left="50%"
      right="50%"
      marginLeft="-50vw"
      marginRight="-50vw"
      background="#1d1c1c"
      ref={ref}
    >
      <Box
        width="100%"
        height="100%"
        position="relative"
        background={`linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.9)), url(${WhatsappBackground})`}
      >
        <VStack spacing={6} m="auto" px={6} py={6} maxWidth="49rem">
          {props.children}
        </VStack>
      </Box>
    </Box>
  )
})
export function WhatsappMessage({
  other = false,
  number,
  username,
  color,
  messages = [],
  time,
  wrapFirst = false,
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
        p={["7px", null, null, 2]}
        flexFlow="column"
        width={wrapFirst ? ["100%", null, "max-content"] : "100%"}
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
            <Text color={color} fontWeight="medium" mr={2} lineHeight="19px">
              {number}
            </Text>
            <Text color="rgba(241,241,242, 0.4)" lineHeight="19px">
              ~{username}
            </Text>
          </Flex>
        )}
        <Flex justifyContent="space-between">
          <Text
            m={0}
            {...textStyle}
            lineHeight="19px"
            fontSize={{ base: "sm", lg: "15px" }}
          >
            {head}
          </Text>
          {timeComp}
        </Flex>
      </Flex>
      {tail.map((message, i) => (
        <Flex
          background={bubbleColor}
          p="6px 7px 8px 9px"
          position="relative"
          justifySelf={other ? "flex-start" : "flex-end"}
          width={["unset", null, "max-content"]}
          whiteSpace={["unset", null, "nowrap"]}
          borderRadius="md"
          key={i}
        >
          <Text
            m={0}
            lineHeight="19px"
            color={textStyle.color}
            fontSize={{ base: "sm", lg: "15px" }}
          >
            {message}
          </Text>
          {timeComp}
        </Flex>
      ))}
    </Grid>
  )
}
