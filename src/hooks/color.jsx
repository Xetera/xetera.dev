import { useColorModeValue } from "@chakra-ui/color-mode"
import { colors } from "../@chakra-ui/gatsby-plugin/theme"

export function useBrandSecondaryColor() {
  return useColorModeValue(
    colors.brandSecondary.light,
    colors.brandSecondary.dark
  )
}

export function useBrandColor() {
  return useColorModeValue(colors.brand.light, colors.brand.dark)
}
