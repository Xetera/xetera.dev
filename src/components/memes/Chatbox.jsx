import React from "react"

const whatsappBackground = "#262d31"

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
  const timeComp = (
    <time
      className="inline-block self-end"
      style={{
        fontSize: "12px",
        color: "rgba(241, 241, 241, 0.6)",
        margin: "-10px 0 -5px 12px",
      }}
    >
      {time}
    </time>
  )
  return (
    <div
      className="grid gap-1 leading-4 "
      style={{
        opacity: "100%",
        maxWidth: 330,
        lineHeight: "19px",
        fontSize: "14px",
      }}
    >
      <span
        style={{ background: whatsappBackground, padding: "6px 7px 8px 9px" }}
        className="p-2 flex flex-col relative rounded-b-lg rounded-r-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="svg-triangle absolute right-full top-0"
          width="10"
          height="10"
          style={{ fill: whatsappBackground }}
        >
          <polygon points="0,0 20,0 20,20" />
        </svg>
        <div className="flex mb-1">
          <span className={`font-semibold mr-2`} style={{ color }}>
            {number}
          </span>
          <span style={{ color: "rgba(241,241,242, 0.4)" }}>~{username}</span>
        </div>
        <div className="flex justify-between">
          <p className="m-0" style={textStyle}>
            {head}
          </p>
          {timeComp}
        </div>
      </span>
      {tail.map(message => (
        <span
          style={{
            background: whatsappBackground,
            padding: "6px 7px 8px 9px",
            ...textStyle,
          }}
          className="rounded-lg p-2 py-1 flex relative w-min whitespace-nowrap"
        >
          <p className="m-0">{message}</p>
          {timeComp}
        </span>
      ))}
    </div>
  )
}
