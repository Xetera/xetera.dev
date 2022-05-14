import React, { useContext } from "react"
import { Link as GatsbyLink } from "gatsby"
import { Box, Flex, Heading, Text } from "@chakra-ui/layout"
import { forwardRef } from "@chakra-ui/system"
import { RoughNotation } from "react-rough-notation"
import { ThemeProvider } from "../data/providers"
import { colors } from "../data/color"
import formatDistance from "date-fns/formatDistance"

export const PostHead = forwardRef(({ date, readingTime, ...props }, ref) => {
  return (
    <Flex alignItems="center" mb={2} color="text.400" ref={ref} {...props}>
      <Box as="time" dateTime={date} color="inherit">
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
  const { description, rawDate } = node.frontmatter
  const { theme } = useContext(ThemeProvider)
  const [hover, setHover] = React.useState(false)
  const distance = formatDistance(new Date(rawDate), new Date(), {
    addSuffix: true,
  })

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
        position="relative"
        flexFlow="column"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <PostHead
          mb={3}
          date={distance}
          readingTime={node.fields.readingTime.text}
        />
        <Heading
          as="h2"
          display="inline"
          fontSize="lg"
          color="text.100"
          fontWeight="semibold"
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
