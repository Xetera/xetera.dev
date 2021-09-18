import { useColorModeValue } from "@chakra-ui/color-mode"
import { colors } from "../data/theme"

export function useBrandSecondaryColor() {
  return useColorModeValue(
    colors.brandSecondary.light,
    colors.brandSecondary.dark
  )
}

export function useBrandColor() {
  return useColorModeValue(colors.brand.light, colors.brand.dark)
}
