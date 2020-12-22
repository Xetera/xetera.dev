import React from "react"
import { SITE_TITLE } from "./data"
import { Link } from "gatsby"

export default function Navbar() {
  return (
    <nav className="bg-theme-alt px-4 py-3 border-0 border-b-2 border-theme-light border-solid">
      <div className="flex justify-center max-w-screen-xl m-auto">
        <Link to="/" className="hover:no-underline" prefetch>
          <h1 className="margin-0 text-lg m-0 font-black text-blueGray-400 hover:text-blueGray-300 transition duration-300">
            {SITE_TITLE}
          </h1>
        </Link>
      </div>
    </nav>
  )
}
