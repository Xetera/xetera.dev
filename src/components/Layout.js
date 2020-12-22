import React from "react"
import Image from "gatsby-image"
import { ToastContext } from "./Popup"
import { BackgroundImage } from "./Image"

export function Hr() {
  return <hr className="mb-5" />
}

export default function Layout({
  children,
  header,
  imageTop,
  imageBottom,
  article,
}) {
  const [toastJsx, setToastJsx] = React.useState(null)
  let width = article ? { maxWidth: "42rem" } : {}

  return (
    <div className="bg-theme">
      <ToastContext.Provider value={{ jsx: toastJsx, setJsx: setToastJsx }}>
        <div className="relative overflow-hidden">
          {imageTop && (
            <div className="lg:mb-quarter-vh">
              <BackgroundImage
                image={imageTop.src.image.fluid}
                pos="top"
                options={{
                  WebkitMaskImage:
                    "-webkit-gradient(linear, 0% 84%, 0% 100%, from(rgb(0, 0, 0)), to(rgba(0, 0, 0, 0)))",
                  "max-height": "75vh",
                  ...imageTop,
                }}
              />
            </div>
          )}
          <div className="mx-auto flex flex-col relative" style={width}>
            <header>{header}</header>
            <main>{children}</main>
          </div>
          {imageBottom && (
            <div className="lg:mt-quarter-vh">
              <BackgroundImage
                image={imageBottom.src.image.fluid}
                pos="bottom"
                options={{
                  ...imageBottom,
                  WebkitMaskImage:
                    "-webkit-gradient(linear, 0% 53%, 0% 0%, from(rgb(0, 0, 0)), to(rgba(0, 0, 0, 0)))",
                }}
              />
            </div>
          )}
        </div>
      </ToastContext.Provider>
    </div>
  )
}
