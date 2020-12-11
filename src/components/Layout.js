import React from "react"
import { Link } from "gatsby"
import { SITE_TITLE } from "./data"
import { FaHandPointLeft } from "react-icons/fa"
import Image from "gatsby-image"
import { ToastContext } from "./Popup"

const classes = "font-white no-underline"

export function Hr() {
  return <hr className="mb-5" />
}

function imageStyle(opacity) {
  return {
    pointerEvents: "none",
    width: "100%",
    position: "absolute",
    opacity: opacity ?? 0.05,
    objectFit: "cover",
    objectPosition: "top",
  }
}

export default function Layout({ children, header, imageTop, imageBottom }) {
  const [toastJsx, setToastJsx] = React.useState(null)

  return (
    <div className="bg-theme">
      <nav className="bg-theme-alt px-4 py-3 border-0 border-b-2 border-theme-light border-solid">
        <div className="flex justify-center max-w-screen-xl m-auto">
          <Link to="/" className="hover:no-underline" prefetch>
            <h1 className="margin-0 text-lg m-0 font-black text-blueGray-400 hover:text-blueGray-300">
              {SITE_TITLE}
            </h1>
          </Link>
        </div>
      </nav>
      <ToastContext.Provider value={{ jsx: toastJsx, setJsx: setToastJsx }}>
        <div className="relative overflow-hidden">
          {imageTop && (
            <div className="lg:mb-quarter-vh">
              <Image
                fluid={imageTop.src.image.fluid}
                className="absolute left-0 top-0 h-half-vh lg:h-inherit"
                style={{
                  ...imageStyle(imageTop.opacity),
                  WebkitMaskImage:
                    "-webkit-gradient(linear, 0% 84%, 0% 100%, from(rgb(0, 0, 0)), to(rgba(0, 0, 0, 0)))",
                }}
              />
            </div>
          )}
          <div
            className="max-w-screen-sm px-4 xl:py-12 py-4 mx-auto flex flex-col"
            style={{ maxWidth: "42rem" }}
          >
            <header>{header}</header>
            <main>{children}</main>
          </div>
          {imageBottom && (
            <div className="lg:mt-quarter-vh">
              <Image
                fluid={imageBottom.src.image.fluid}
                className="absolute bottom-0 left-0 mb-0"
                style={{
                  ...imageStyle(imageBottom.opacity),
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
