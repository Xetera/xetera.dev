import React from "react"
import { forwardRef } from "@chakra-ui/system"
import { Grid } from "@chakra-ui/layout"

export const CenteredGrid = forwardRef(({ children, ...rest }, ref) => {
  return (
    <Grid
      className="centered-grid"
      as="article"
      gridAutoFlow="row"
      gridTemplateColumns="1fr min(50rem, 100%) 1fr"
      ref={ref}
      {...rest}
    >
      {children}
    </Grid>
  )
})
