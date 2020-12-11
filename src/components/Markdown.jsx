import React from "react"

export function WideBanner({ title, children, centered, bordered, ...rest }) {
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
        bordered && "border-theme-light border-y-2 border-solid"
      } relative mb-6`}
    >
      <div
        style={{ maxWidth: "42rem" }}
        className={`p-4 text-blueGray-400 ${centered && "m-auto"}`}
      >
        {title && (
          <h2 className="text-base font-bold mt-0 mb-1 text-blueGray-400 items-center flex">
            {title}
          </h2>
        )}
        <p className="mb-0 text-blueGray-300">{children}</p>
      </div>
    </div>
  )
}
