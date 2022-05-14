import React, { forwardRef } from "react"
import { Box } from "@chakra-ui/layout"
import { OutboundLink } from "gatsby-plugin-google-analytics"

const ExternalLink = forwardRef(({ href, children, ...rest }, ref) => {
  const linkExtras = rest["aria-label"]
    ? { "aria-label": rest["aria-label"] }
    : {}
  return (
    <Box as="span" {...rest} ref={ref}>
      <OutboundLink
        rel="external noopener noreferrer"
        target="_blank"
        href={href}
        {...linkExtras}
      >
        {children}
      </OutboundLink>
    </Box>
  )
})

export default ExternalLink
