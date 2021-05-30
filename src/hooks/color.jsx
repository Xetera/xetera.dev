import { useColorModeValue } from "@chakra-ui/color-mode"
import { themedColors } from "../@chakra-ui/gatsby-plugin/theme"

export function useBrandColor() {
  return useColorModeValue(themedColors.brand.light, themedColors.brand.dark)
}
