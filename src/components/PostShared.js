import React from "react"
import { Link as GatsbyLink } from "gatsby"
import { Box, Flex, Heading, Text } from "@chakra-ui/layout"
import { forwardRef } from "@chakra-ui/system"
import { RoughNotation } from "react-rough-notation"
import { useBrandColor } from "../hooks/color"

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
          // textDecoration={hover ? "underline" : "none"}
          // textDecorationStyle="dashed"
          // textDecorationColor={hover ? color : "transparent"}
          // transition="all 0.4s ease-in-out"
          mb={1}
        >
          <RoughNotation type="highlight" color={color} show={hover}>
            {title}
          </RoughNotation>
        </Heading>
        <Text as="p" fontSize="18px" color="text.secondary">
          {description}
        </Text>
        {/* <Text>Read more</Text> */}
        {/* <Text as="p">
          {node.excerpt}
        </Text> */}
      </Flex>
    </GatsbyLink>
  )
}
