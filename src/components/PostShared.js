import React, { useContext } from "react"
import { Link as GatsbyLink } from "gatsby"
import { Box, Flex, Heading, Text } from "@chakra-ui/layout"
import { forwardRef } from "@chakra-ui/system"
import { RoughNotation } from "react-rough-notation"
import { ThemeContext } from "@emotion/react"
import { ThemeProvider } from "../data/providers"
import { colors } from "../data/theme"

export const PostHead = forwardRef(({ date, readingTime, ...props }, ref) => {
  return (
    <Flex
      alignItems="center"
      mb={2}
      color="gray.500"
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
  const { theme } = useContext(ThemeProvider)
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
        <PostHead mb={3} date={date} readingTime={node.fields.readingTime.text} />
        <Heading
          as="h2"
          display="inline"
          fontSize="lg"
          color="text.100"
          fontWeight="bold"
          mb={3}
        >
          <RoughNotation
            type="highlight"
            color={
              theme === "light" ? colors.highlight.light : colors.highlight.dark
            }
            show={hover}
          >
            {title}
          </RoughNotation>
        </Heading>
        <Text as="p" fontSize="md" color="text.300">
          {description}
        </Text>
      </Flex>
    </GatsbyLink>
  )
}
