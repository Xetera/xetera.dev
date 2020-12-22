import React from "react"

export function WideBanner({
  title,
  children,
  centered,
  bordered,
  className = "",
  innerClassName = "",
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
      className={`bg-theme-alt ${
        bordered &&
        "border-theme-light border-t-2 border-b-2 border-l-0 border-r-0 border-solid"
      } relative mb-6 ${className}`}
    >
      <div
        style={{ maxWidth: "42rem" }}
        className={`py-4 px-6 text-blueGray-400 ${
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
  reactions = [],
}) {
  return (
    <div className="mb-2 flex" style={{ color: "#dcddde", lineHeight: "1.4" }}>
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
