import React from "react"
import Prism from "prism-react-renderer/prism"
import Highlight, { defaultProps } from "prism-react-renderer"
import Theme from "prism-react-renderer/themes/vsDark"
import json5 from "json5"
import rangeParser from "parse-numeric-range"
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
    <div
      style={{
        width: "100vw",
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw",
        ...(rest?.style ?? {}),
      }}
      className={`${!noBg ? "bg-theme-alt" : ""} ${
        bordered &&
        "border-theme-light border-t-1 border-b-1 border-l-0 border-r-0 border-solid"
      } relative mb-6 ${className}`}
    >
      <div
        style={{ maxWidth: "42rem" }}
        className={`${!noPadding ? "py-4 px-6" : ""} text-blueGray-400 ${
          centered && "m-auto"
        } ${innerClassName}`}
      >
        {title && (
          <h2 className="text-base font-bold mt-0 mb-1 text-blueGray-400 items-center flex">
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
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

export function DiscordMessage({
  message,
  username,
  roleColor,
  date,
  avatar,
  className = "",
  reactions = [],
}) {
  return (
    <div
      className={`mb-2 flex ${className}`}
      style={{
        color: "#dcddde",
        lineHeight: "1.4",
        background: "#36393f",
      }}
    >
      <img
        className="mb-0 mr-3 md:w-10 md:h-10 w-8 h-8 rounded-full"
        src={avatar}
        width="40px"
      />
      <div>
        <div className="flex items-baseline mb-0">
          <p className={`${roleColor} font-semibold text-sm mb-0`}>
            {username}
            <datetime
              className="text-coolGray-500 ml-2 font-normal"
              style={{ fontSize: "12px" }}
            >
              {date}
            </datetime>
          </p>
        </div>
        <p style={{ fontSize: "16px" }} className="mb-1">
          {message}
        </p>
        {reactions.map(props => (
          <DiscordReaction {...props} />
        ))}
      </div>
    </div>
  )
}

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

export const overrides = {
  pre(props) {
    return <div {...props} />
  },
  code({ children, className, metastring }) {
    const extraProps = json5.parse(metastring ?? "{}") ?? {}
    if (typeof extraProps.lang === "undefined") {
      extraProps.lang = true
    }
    console.log(extraProps)
    const shouldHighlightLine = calculateLinesToHighlight(extraProps.h)
    const language = className.replace(/language-/, "") || ""
    const highlighterClass = languageMappings[language]
    const isPreTitle = extraProps.title?.startsWith("/")
    const TitleType = isPreTitle ? "pre" : "div"

    return (
      <>
        {extraProps.title && (
          <TitleType className="w-full px-4 py-2 mb-0 bg-theme-alt text-sm text-blueGray-500 rounded-t">
            {extraProps.title}
          </TitleType>
        )}
        <Highlight
          {...defaultProps}
          code={children}
          language={language}
          theme={Theme}
        >
          {({ className, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} border-1 border-theme-alt border-solid relative mb-7`}
            >
              {highlighterClass && extraProps.lang && (
                <p
                  className={`absolute font-extralight top-0 right-2 py-1 px-2 text-xs opacity-80 rounded-b ${highlighterClass.className}`}
                >
                  {highlighterClass.name}
                </p>
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
                    <span className="mr-4 text-blueGray-600 select-none">
                      {i + 1}
                    </span>
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
            </pre>
          )}
        </Highlight>
      </>
    )
  },
}
