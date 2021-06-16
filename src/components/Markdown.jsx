import React, { useRef } from "react"
import Prism from "prism-react-renderer/prism"
import Highlight, { defaultProps } from "prism-react-renderer"
import Theme from "prism-react-renderer/themes/vsDark"
import ThemeLight from "prism-react-renderer/themes/github"
import json5 from "json5"
import rangeParser from "parse-numeric-range"
import { maxWidth } from "../templates/post"
import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/layout"
import { layoutContentPadding } from "./Layout"
import { Image } from "@chakra-ui/image"
import { forwardRef, useColorMode } from "@chakra-ui/system"
import { Tooltip, useTooltip } from "@chakra-ui/tooltip"
import { useBreakpoint, useBreakpointValue } from "@chakra-ui/react"
export * from "./memes/Chatbox"
;(typeof global !== "undefined" ? global : window).Prism = Prism
require("prismjs/components/prism-typescript")
require("prismjs/components/prism-haskell")

const languageMappings = {
  js: {
    className: "bg-yellow-700 text-yellow-100",
    name: "Javascript",
  },
  py: {
    className: "bg-yellow-900 text-yellow-400",
    name: "Python",
  },
  ts: {
    className: "bg-blue-600 text-blue-200",
    name: "Typescript",
  },
  bash: {
    className: "bg-blue-600 text-blue-200",
    name: "Bash",
  },
  hs: {
    className: "bg-purple-800 text-purple-300",
    name: "Haskell",
  },
}

export const WideBanner = forwardRef((props, ref) => {
  const {
    title,
    children,
    centered,
    bordered,
    className = "",
    inner = {},
    noBg,
    noPadding,
    ...rest
  } = props

  return (
    <Box
      width="100vw"
      left="50%"
      right="50%"
      marginLeft="-50vw"
      marginRight="-50vw"
      position="relative"
      mb={6}
      // layerStyle="bgSecondary"
      ref={ref}
      className={`${!noBg ? "bg-theme-alt" : ""} ${
        bordered &&
        "border-theme-light border-t-1 border-b-1 border-l-0 border-r-0 border-solid"
      } mb-6 ${className}`}
      {...rest}
    >
      <Grid
        className="widebanner"
        maxWidth={maxWidth}
        px={layoutContentPadding}
        {...inner}
        {...(centered ? { mx: "auto" } : {})}
        {...(!noPadding
          ? {
              py: 6,
            }
          : {})}
      >
        {title && (
          <h2
            mb={0}
            className="text-base font-bold mt-0 mb-1 text-blueGray-400 items-center flex"
          >
            {title}
          </h2>
        )}
        {children}
      </Grid>
    </Box>
  )
})

export function DiscordReaction({
  image,
  reactCount,
  reacted: _reacted,
  name,
}) {
  const [reacts, setReacts] = React.useState(reactCount)
  const [reacted, setReacted] = React.useState(_reacted)
  let mounted = useRef()
  const t = useTooltip()
  React.useEffect(() => {
    mounted.current = true
  }, [])
  React.useEffect(() => {
    if (!mounted.current) {
      return
    }
    setReacts(prev => (reacted ? prev + 1 : prev - 1))
  }, [reacted])
  function react() {
    setReacted(prev => !prev)
  }

  const tooltip = (
    <Flex
      alignItems="center"
      px={2}
      py={2}
      m={0}
      borderRadius="md"
      overflow="hidden"
    >
      <Image src={image} width="40px" height="40px" mr={2} />
      <Text layerStyle="discordTextColor" mb={0} lineHeight="19px">
        {reacted
          ? reacts === 1
            ? `You reacted with ${name}`
            : `You and ${reacts - 1} others reacted with ${name}`
          : `${reacts} ${
              reacts === 1 ? "person" : "people"
            } reacted with ${name}`}
      </Text>
    </Flex>
  )
  return (
    <Tooltip
      arrowShadowColor="gray.900"
      layerStyle="discordBackground"
      openDelay={500}
      label={tooltip}
      placement="top"
      arrowPadding={0}
      closeOnClick={false}
    >
      <Box
        display={reacts === 9 ? "none" : "inline-flex"}
        borderWidth="1px"
        layerStyle="borderSubtle"
        alignItems="center"
        borderRadius="md"
        cursor="pointer"
        mr={1}
        p="0.125rem 0.375rem"
        onClick={react}
        background={reacted ? "rgba(114,137,218,.3)" : "hsl(0, 0%, 100%, 0.06)"}
      >
        <Image src={image} mb={0} width="16px" height="16px" />
        <Text
          fontSize="xs"
          mb={0}
          alignText="center"
          ml={1}
          color={reacted ? "#7289da" : "#72767d"}
        >
          {reacts}
        </Text>
      </Box>
    </Tooltip>
  )
}

export const DiscordMessageContainer = ({ children }) => (
  <WideBanner
    centered
    py={2}
    my={6}
    layerStyle="discordBackground"
    inner={{ gap: 22 }}
  >
    {children}
  </WideBanner>
)

export const DiscordMessage = forwardRef(
  (
    {
      message,
      messages,
      username,
      roleColor,
      date,
      avatar,
      className = "",
      reactions = [],
      ...props
    },
    ref
  ) => {
    return (
      <Flex
        mb={2}
        color="#dcddde"
        lineHeight="1.4"
        // background="#36393f"
        mb={0}
        ref={ref}
        {...props}
      >
        <Box
          as="figure"
          mb={0}
          mr={3}
          width={[10]}
          height={[10]}
          borderRadius="full"
          overflow="hidden"
          flexBasis={[10]}
          flexGrow={0}
          flexShrink={0}
        >
          <Image objectFit="cover" src={avatar} height={[10]} width={[10]} />
        </Box>
        <div>
          <Flex alignItems="baselin" mb={1} lineHeight="22.5px">
            <Heading
              fontSize="15.75px"
              fontWeight="semibold"
              {...(!roleColor ? { layerStyle: "discordTextColor" } : {})}
              color={roleColor}
              mb={0}
            >
              {username}
              <Box
                as="datetime"
                ml={2}
                fontWeight="normal"
                fontSize="xs"
                color="#72767d"
                layerStyle="textTertiary"
              >
                {date}
              </Box>
            </Heading>
          </Flex>
          {(messages ?? [message]).map((message, i, arr) => (
            <Text
              fontSize="16px"
              fontWeight="normal"
              layerStyle="discordTextColor"
              lineHeight="22.5px"
              mb={i !== arr.length - 1 ? 1 : 0}
              key={message}
            >
              {message}
            </Text>
          ))}
          {reactions && (
            <Box mt={2}>
              {reactions.map(props => (
                <DiscordReaction {...props} key={props.image} />
              ))}
            </Box>
          )}
        </div>
      </Flex>
    )
  }
)

const calculateLinesToHighlight = meta => {
  const RE = /([\d,-]+)/
  if (RE.test(meta)) {
    const strlineNumbers = RE.exec(meta)[1]
    const lineNumbers = rangeParser(strlineNumbers)
    return index => lineNumbers.includes(index + 1)
  } else {
    return () => false
  }
}

function Code({ children, className, metastring }) {
  const shouldDisplayLineNumbers = useBreakpointValue([false, false, true])
  const extraProps = json5.parse(metastring ?? "{}") ?? {}
  const { colorMode } = useColorMode()
  if (typeof extraProps.lang === "undefined") {
    extraProps.lang = true
  }

  const shouldHighlightLine = calculateLinesToHighlight(extraProps.h)
  const language = className?.replace(/language-/, "") || ""
  const highlighterClass = languageMappings[language]
  const isPreTitle = extraProps.title?.startsWith("/")
  const TitleType = isPreTitle ? "pre" : "div"

  return (
    <Flex flexFlow="column">
      {/* {extraProps.title && (
        <Box
          as={TitleType}
          width="full"
          px={4}
          py={2}
          mb={0}
          layerStyle="bgSecondary"
          fontSize="sm"
          borderTopRadius="sm"
          className="w-full px-4 py-2 mb-0 bg-theme-alt text-sm text-blueGray-500 rounded-t"
        >
          {extraProps.title}
        </Box>
      )} */}
      <Highlight
        {...defaultProps}
        code={children}
        language={language}
        theme={colorMode === "dark" ? Theme : ThemeLight}
      >
        {({ className, tokens, getLineProps, getTokenProps }) => (
          <Text
            as="pre"
            py={[0, null, 2]}
            px={[0, null, 4]}
            borderWidth={[0, null, "1px"]}
            wordBreak="break-all"
            layerStyle="borderSubtle"
            position="relative"
            overflowX="auto"
            transition="all 0.2s"
            fontSize={["sm", null, "md"]}
            mb={7}
          >
            {/* {highlighterClass && extraProps.lang && (
              <Text
                position="absolute"
                fontWeight="light"
                top={0}
                right={0}
                py={2}
                px={3}
                fontSize="xs"
                opacity="80%"
              >
                {highlighterClass.name}
              </Text>
            )} */}
            {tokens.map((line, i) => {
              // Remove the last empty line:
              let lineNumberElem
              if (
                line.length === 1 &&
                line[0].empty === true &&
                i === tokens.length - 1
              ) {
                lineNumberElem = null
              } else if (extraProps.lines) {
                lineNumberElem = (
                  <Box
                    as="span"
                    mr={4}
                    userSelect="none"
                    layerStyle="textTertiary"
                    // className="mr-4 text-blueGray-600 select-none"
                  >
                    {i + 1}
                  </Box>
                )
              }
              // For some reason prism-react-renderer likes adding 1 extra line
              // at the end of every codeblock so we remove it here
              if (i === tokens.length - 1) {
                return null
              }
              const lineProps = getLineProps({ line, key: i })

              if (shouldHighlightLine(i)) {
                lineProps.className = `${lineProps.className} highlight-line`
              }

              return (
                <div key={i} {...lineProps}>
                  {shouldDisplayLineNumbers && lineNumberElem}
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              )
            })}
          </Text>
        )}
      </Highlight>
    </Flex>
  )
}

export const overrides = {
  pre(props) {
    return <Flex as="pre" flexDirection="column" flexGrow="1" {...props} />
  },
  code: ({ children, ...props }) => (
    <Code variant="outline" {...props}>
      {children}
    </Code>
  ),
}
