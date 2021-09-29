import { useStaticQuery, graphql } from "gatsby"
import React from "react"
import { LanyardProvider } from "../data/providers"
import { useLanyard } from "../hooks/lanyard"

const Lanyard = ({ children }) => {
  // stupid gatsby

  const { site } = useStaticQuery(graphql`
    query PersistentLayoutQuery {
      site {
        siteMetadata {
          social {
            discordId
          }
        }
      }
    }
  `)

  const lanyard = useLanyard(site.siteMetadata.social.discordId)

  return (
    <LanyardProvider.Provider value={lanyard}>
      {children}
    </LanyardProvider.Provider>
  )
}
export default Lanyard
