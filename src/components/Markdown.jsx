import React from "react"
import Prism from "prism-react-renderer/prism"
import Highlight, { defaultProps } from "prism-react-renderer"
import Theme from "prism-react-renderer/themes/vsDark"
import ThemeLight from "prism-react-renderer/themes/github"
import json5 from "json5"
import rangeParser from "parse-numeric-range"
import { maxWidth } from "../templates/post"
import { Box, Flex, Heading, Text } from "@chakra-ui/layout"
import { layoutContentPadding } from "./Layout"
import { Image } from "@chakra-ui/image"
import { forwardRef, useColorMode } from "@chakra-ui/system"
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

export function WideBanner({
  title,
  children,
  centered,
  bordered,
  className = "",
  innerClassName = "",
  noBg,
  noPadding,
  ...rest
}) {
  return (
    <Box
      width="100vw"
      left="50%"
      right="50%"
      marginLeft="-50vw"
      marginRight="-50vw"
      position="relative"
      mb={6}
      layerStyle="bgSecondary"
      {...(rest?.style ?? {})}
      className={`${!noBg ? "bg-theme-alt" : ""} ${
        bordered &&
        "border-theme-light border-t-1 border-b-1 border-l-0 border-r-0 border-solid"
      } mb-6 ${className}`}
    >
      <Box
        className="widebanner"
        maxWidth={maxWidth}
        px={layoutContentPadding}
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
      </Box>
    </Box>
  )
}

export function DiscordReaction({ image, reactCount, reacted: _reacted }) {
  const [reacts, setReacts] = React.useState(reactCount)
  const [reacted, setReacted] = React.useState(_reacted)
  React.useEffect(() => {
    setReacts(prev => (reacted ? prev + 1 : prev - 1))
  }, [reacted])
  function react() {
    setReacted(prev => !prev)
  }
  return (
    <div
      className="items-center rounded cursor-pointer mr-1"
      onClick={react}
      style={{
        display: reacts === 0 ? "none" : "inline-flex",
        padding: "0.125rem 0.375rem",
        background: reacted ? "rgba(114,137,218,.3)" : "hsl(0, 0%, 100%, 0.06)",
      }}
    >
      <img src={image} className="mb-0" style={{ width: 16, height: 16 }} />
      <p
        className="text-xs mb-0 text-center"
        style={{
          marginLeft: "0.375rem",
          color: reacted ? "#7289da" : "#72767d",
        }}
      >
        {reacts}
      </p>
    </div>
  )
}

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
    },
    ref
  ) => {
    return (
      <Flex
        mb={2}
        color="#dcddde"
        lineHeight="1.4"
        background="#36393f"
        ref={ref}
      >
        <Box
          as="figure"
          mb={0}
          mr={3}
          width={[8, 10]}
          height={[8, 10]}
          borderRadius="full"
          overflow="hidden"
          minWidth="2.5rem"
        >
          <Image objectFit="cover" src={avatar} />
        </Box>
        <div>
          <div className="flex items-baseline mb-0">
            <Heading fontWeight="semibold" mb={0} fontSize="sm">
              {username}
              <Box
                as="datetime"
                ml={2}
                fontWeight="normal"
                fontSize="xs"
                layerStyle="textTertiary"
              >
                {date}
              </Box>
            </Heading>
          </div>
          {(messages ?? [message]).map((message, i, arr) => (
            <Text fontSize="md" mb={i !== arr.length - 1 ? 2 : 0} key={message}>
              {message}
            </Text>
          ))}
          {reactions.map(props => (
            <DiscordReaction {...props} key={props.image} />
          ))}
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
    <>
      {extraProps.title && (
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
      )}
      <Highlight
        {...defaultProps}
        code={children}
        language={language}
        theme={colorMode === "dark" ? Theme : ThemeLight}
      >
        {({ className, tokens, getLineProps, getTokenProps }) => (
          <Text
            as="pre"
            py={2}
            px={4}
            borderWidth="1px"
            layerStyle="borderSubtle"
            position="relative"
            transition="all 0.2s"
            fontSize="md"
            mb={7}
          >
            {highlighterClass && extraProps.lang && (
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
            )}
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
                  {lineNumberElem}
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              )
            })}
          </Text>
        )}
      </Highlight>
    </>
  )
}

export const overrides = {
  pre(props) {
    return <div {...props} />
  },
  code: Code,
}
