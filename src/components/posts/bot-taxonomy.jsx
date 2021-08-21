import React from "react"
import {
  Grid,
  Box,
  Flex,
  Link,
  OrderedList,
  ListItem,
  Text,
} from "@chakra-ui/react"

export const Cell = ({ options, title, subtitle, children }) => (
  <Box
    layerStyle="borderSubtlePrimary"
    borderWidth="1px"
    _hover={{
      layerStyle: "borderSubtle",
    }}
  >
    <Flex
      as="section"
      flexDirection="column"
      layerStyle={["textPrimary"]}
      height="100%"
      sx={{ aspectRatio: "1/1" }}
      fontSize="md"
      position="relative"
      lineHeight={6}
      width="100%"
    >
      <Flex layerStyle="bgSecondary" justifyContent="center">
        <Link
          href={`#${title.toLowerCase().slice(2).split(" ").join("-")}`}
          width="100%"
          textDecoration="none"
          transition="transform 0.1s ease-in-out"
          _hover={{
            transform: "scale(1.1)",
          }}
          textAlign="center"
          color="inherit"
          fontSize={["sm", "md"]}
          layerStyle="textTertiary"
          py={2}
        >
          {title}
        </Link>
      </Flex>
      {children}
      {subtitle && (
        <Flex px={4} pt={2}>
          <Text>{subtitle}</Text>
        </Flex>
      )}
      {options && (
        <OrderedList
          px={4}
          py={2}
          m={0}
          as="li"
          layerStyle="textSecondary"
          styleType="korean-hangul-formal"
          stylePosition="inside"
          fontSize="sm"
          spacing={1}
          height="min-content"
        >
          {options?.map((option, i) => {
            return <ListItem key={i}>{option}</ListItem>
          })}
        </OrderedList>
      )}
    </Flex>
  </Box>
)

export const Grid3x3 = ({ children }) => (
  <Grid
    gridTemplateColumns={["repeat(auto-fill, minmax(200px, 1fr))"]}
    maxWidth={["280px", "100%"]}
    margin="auto"
    gridAutoRows="1fr"
    gap="8px"
    children={children}
  />
)
