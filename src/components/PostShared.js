import React from "react"
import { Link as GatsbyLink } from "gatsby"
import { Box, Flex, Heading, Text } from "@chakra-ui/layout"
import { forwardRef } from "@chakra-ui/system"

export const PostHead = forwardRef(({ date, readingTime, ...props }, ref) => {
  return (
    <Flex
      alignItems="center"
      mb={2}
      color="gray.500"
      fontSize="14px"
      ref={ref}
      {...props}
    >
      <Box as="time" dateTime="date">
        {date}
      </Box>
      <Box mx="10px">·</Box>
      <Text>{readingTime}</Text>
    </Flex>
  )
})

export function PostList({ node }) {
  const title = node.frontmatter.title ?? node.fields.slug
  const { description, date } = node.frontmatter

  return (
    <GatsbyLink
      to={node.fields.slug}
      className="no-link"
      style={{
        textDecoration: "none",
      }}
      key={node.fields.slug}
    >
      <Flex as="article" flexFlow="column">
        <PostHead date={date} readingTime={node.fields.readingTime.text} />
        <Heading
          as="h2"
          fontSize="18px"
          layerStyle="textPrimary"
          fontWeight="bold"
          mb={2}
        >
          {title}
        </Heading>
        <Text as="p" fontSize="16px" color="text.secondary">
          {description}
        </Text>
      </Flex>
    </GatsbyLink>
  )
}
