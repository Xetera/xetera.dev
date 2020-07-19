import React from "react"
import { Link } from "gatsby"
import { SITE_TITLE } from "./data"
import { FaHandPointLeft } from "react-icons/fa"
import Helmet from "gatsby-plugin-react-helmet"
import ExternalLink from "./ExternalLink"
import Popup, { ToastContext } from "./Popup"

const classes = "font-white no-underline"

export function Hr() {
  return <hr className="mb-5" />
}

export default function Layout({ location, children }) {
  const [toastJsx, setToastJsx] = React.useState(null)
  const rootPath = `${__PATH_PREFIX__}/`
  const isRoot = location.pathname === rootPath
  const header = (
    <Link
      to="/ "
      className={`text-gray-200 ${isRoot ? "hover:no-underline" : ""}`}
    >
      {isRoot ? (
        <h1
          className={`xl:text-6xl text-4xl ${classes}  mb-4 md:mb-6 font-black`}
        >
          {SITE_TITLE}
        </h1>
      ) : (
        <h1 className="mb-4 flex items-center cursor-pointer font-black md:text-2xl text-xl  text-gray-400">
          <FaHandPointLeft size="30px" className="mr-4 pointer mb-1" />
          {SITE_TITLE}
        </h1>
      )}
    </Link>
  )

  return (
    <ToastContext.Provider value={{ jsx: toastJsx, setJsx: setToastJsx }}>
      <div
        className="max-w-screen-sm px-4 xl:py-12 py-4 mx-auto relative"
        style={{ maxWidth: "42rem" }}
      >
        <header>{header}</header>
        <main>{children}</main>
      </div>
    </ToastContext.Provider>
  )
}
