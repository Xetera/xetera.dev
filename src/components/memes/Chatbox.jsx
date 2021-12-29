import { Box, Flex, Grid, Text, HStack } from "@chakra-ui/layout"
import { forwardRef, VStack } from "@chakra-ui/react"
import React from "react"
import WhatsappBackground from "@assets/whatsapp_background.png"
import { SkeletonCircle } from "@chakra-ui/react"
import { Tooltip, useTooltip } from "@chakra-ui/tooltip"
import { Image } from "@chakra-ui/image"

const whatsappBackground = "#262d31"
const facebookBackground = "#e4e6eb"
const whatsappBackgroundSelf = "rgb(5, 97, 98)"
const facebookBackgroundSelf = "rgb(0, 132, 255)"

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
      ref={ref}
    >
      <Box
        width="100%"
        height="100%"
        position="relative"
        background={`linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.9)), url(${WhatsappBackground})`}
      >
        <VStack spacing={6} m="auto" px={6} py={6} maxWidth="53rem">
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
            fontSize={["sm", null, null, "15px"]}
          >
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
          justifySelf={other ? "flex-start" : "flex-end"}
          width={["unset", null, "max-content"]}
          whiteSpace={["unset", null, "nowrap"]}
          borderRadius="md"
        >
          <Text
            m={0}
            lineHeight="19px"
            color={textStyle.color}
            fontWeight={message.highlight ? "semibold" : "normal"}
            fontSize={["sm", null, null, "md"]}
          >
            {message}
          </Text>
          {timeComp}
        </Flex>
      ))}
    </Grid>
  )
}

const FacebookMessageAvatar = ({ avatar }) => {
  const [loaded, setLoaded] = React.useState(false)
  if (typeof avatar === "string") {
    return (
      <Box
        as="figure"
        mb={0}
        width={[10]}
        height={[10]}
        borderRadius="full"
        overflow="hidden"
        flexBasis={[10]}
        flexGrow={0}
        alignSelf="flex-start"
        flexShrink={0}
      >
        <SkeletonCircle isLoaded={loaded} height={[10]} width={[10]}>
          <Image
            htmlHeight="40px"
            htmlWidth="40px"
            objectFit="cover"
            src={avatar}
            onLoad={() => setLoaded(true)}
          />
        </SkeletonCircle>
      </Box>
    )
  }
  return avatar
}

export const FacebookContainer = forwardRef((props, ref) => {
  return (
    <Box
      width="100vw"
      position="relative"
      mb={6}
      left="50%"
      right="50%"
      marginLeft="-50vw"
      marginRight="-50vw"
      background="facebookBackground"
      ref={ref}
    >
      <Box
        width="100%"
        height="100%"
        position="relative"
        backgroundColor="facebookBackground"
      >
        <VStack spacing={3} m="auto" px={6} py={6} maxWidth="49rem">
          {props.children}
        </VStack>
      </Box>
    </Box>
  )
})
export function FacebookMessage({
  other = false,
  username,
  color,
  messages = [],
  time,
  avatar,
  wrapFirst = false,
}) {
  const fontFamily =
    "'Segoe UI Historic', 'Segoe UI', Helvetica, Arial, sans-serif"
  const bubbleColor = other ? "facebookBubbleColor" : facebookBackgroundSelf
  const [head, ...tail] = messages
  return (
    <>
      <Grid
        alignSelf={other ? "flex-start" : "flex-end"}
        gap={1}
        opacity="100%"
        maxWidth="400px"
        lineHeight="19px"
        fontSize="sm"
      >
        {/* Dirty */}
        <HStack justifySelf={other ? "flex-start" : "flex-end"}>
          {other && <FacebookMessageAvatar avatar={avatar} />}
          <Tooltip label={head.original ?? head.content} placement="top">
            <Flex
              align="flex-end"
              background={bubbleColor}
              padding="8px 12px 8px 12px"
              position="relative"
              flexFlow="column"
              justifySelf={other ? "flex-start" : "flex-end"}
              boxShadow={head.highlight && "0px 0px 10px 0px rgb(0 150 255)"}
              borderRadius="18px"
            >
              <Text
                m={0}
                lineHeight="19px"
                color={other ? "facebookTextColor" : "#FFFFFF"}
                fontSize={["sm", null, null, "md"]}
                fontFamily={fontFamily}
              >
                {head.content ?? head.original}
              </Text>
            </Flex>
          </Tooltip>
          {!other && <FacebookMessageAvatar avatar={avatar} />}
        </HStack>
        {tail.map(message => (
          <Tooltip label={message.original ?? message.content} placement="top">
            <Flex
              background={bubbleColor}
              padding="8px 12px 8px 12px"
              mt={message.highlight && "0.3rem"}
              mb={message.highlight && "0.3rem"}
              position="relative"
              flexFlow="column"
              boxShadow={message.highlight && "0px 0px 10px 0px rgb(0 150 255)"}
              justifySelf={other ? "flex-start" : "flex-end"}
              borderRadius="18px"
              ml={other && "3rem"}
              mr={!other && "3rem"}
            >
              <Text
                m={0}
                lineHeight="19px"
                fontFamily={fontFamily}
                color={other ? "facebookTextColor" : "#FFFFFF"}
                fontSize={["sm", null, null, "md"]}
              >
                {message.content ?? message.original}
              </Text>
            </Flex>
          </Tooltip>
        ))}
      </Grid>
    </>
  )
}
