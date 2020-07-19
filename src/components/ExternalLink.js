import React from "react"
import { OutboundLink } from "gatsby-plugin-google-analytics"

export default function ExternalLink({ children, ...rest }) {
  return (
    <OutboundLink rel="external noopener noreferrer" target="_blank" {...rest}>
      {children}
    </OutboundLink>
  )
}
