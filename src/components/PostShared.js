import React from "react"
import { Link as GatsbyLink } from "gatsby"
import { Box, Flex, Heading, Text } from "@chakra-ui/layout"
import { forwardRef } from "@chakra-ui/system"
import { RoughNotation } from "react-rough-notation"
import { useBrandColor } from "../hooks/color"
import { useColorModeValue } from "@chakra-ui/react"

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
      <Box as="time" dateTime="date" color="inherit">
        {date}
      </Box>
      <Box mx="10px" color="inherit">
        ·
      </Box>
      <Text color="inherit">{readingTime}</Text>
    </Flex>
  )
})

export function PostList({ node }) {
  const title = node.frontmatter.title ?? node.fields.slug
  const { description, date } = node.frontmatter
  const color = useBrandColor()
  const highlightColor = useColorModeValue("yellow", color)
  const [hover, setHover] = React.useState(false)

  return (
    <GatsbyLink
      to={node.fields.slug}
      className="no-link"
      style={{
        textDecoration: "none",
      }}
      key={node.fields.slug}
    >
      <Flex
        as="article"
        flexFlow="column"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <PostHead date={date} readingTime={node.fields.readingTime.text} />
        <Heading
          as="h2"
          display="inline"
          fontSize="22px"
          layerStyle="textPrimary"
          fontWeight="bold"
          mb={1}
        >
          <RoughNotation type="highlight" color={highlightColor} show={hover}>
            {title}
          </RoughNotation>
        </Heading>
        <Text as="p" fontSize="18px" layerStyle="textSecondary">
          {description}
        </Text>
      </Flex>
    </GatsbyLink>
  )
}
