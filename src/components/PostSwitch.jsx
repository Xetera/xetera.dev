import React from "react"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Switch } from "@chakra-ui/switch"

export function PostSwitch() {
  return (
    <FormControl display="flex" alignItems="center" width="min-content">
      <FormLabel
        htmlFor="post-switch"
        mb="0"
        fontWeight="400"
        fontSize="14px"
        whiteSpace="nowrap"
      >
        🙈 Enable reality mode?
      </FormLabel>
      <Switch id="post-switch" size="sm" />
    </FormControl>
  )
}
