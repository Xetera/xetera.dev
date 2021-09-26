import { graphql, StaticQuery } from "gatsby"
import React from "react"
import PersistentLayout from "../components/PersistentLayout"
import { StyleManager } from "./chakra"

export const wrapRootElement = ({ element }) => {
  return (
    <StaticQuery
      query={graphql`
        query RootWrapperQuery {
          site {
            siteMetadata {
              social {
                discordId
                twitter
              }
            }
          }
        }
      `}
      render={data => (
        <StyleManager>
          <PersistentLayout data={data.site}>{element}</PersistentLayout>
        </StyleManager>
      )}
    />
  )
}
