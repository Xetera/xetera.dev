import React from "react"
import { Box, Flex, Grid, Image, Tag, Text } from "@chakra-ui/react"
import { graphql, Link, useStaticQuery } from "gatsby"
import formatDistance from "date-fns/formatDistance"

function skewer(word) {
  return word.replace(/\s+/g, "-")
}

export function Book(props) {
  const [{ firstName, lastName } = {}] = props.authors
  const author = `${firstName ?? ""} ${lastName ?? ""}`.trim()
  const link = `https://www.amazon.com/${skewer(props.title)}-${skewer(
    author
  )}/dp/${props.asin}`

  const percentageText = Number(props.percentageRead.toFixed(1))
  return (
    <Box
      role="group"
      target="_blank"
      rel="noopener noreferrer"
      href={link}
      transition="all 0.2s"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow:
          "0 1px 1px hsl(0deg 0% 0% / 0.075), 0 2px 2px hsl(0deg 0% 0% / 0.075), 0 4px 4px hsl(0deg 0% 0% / 0.075), 0 8px 8px hsl(0deg 0% 0% / 0.075), 0 16px 16px hsl(0deg 0% 0% / 0.075)",
      }}
      as="a"
      display="flex"
      direction="column"
      position="relative"
      padding={3}
      borderRadius="sm"
      backdropBlur="12px"
      border="1px solid rgba(255, 255, 255, 0.11);"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1);"
      overflow="hidden"
      sx={{
        WebkitBackdropFilter: "blur(5px)",
      }}
      background={"bookBackground"}
    >
      <Flex gap={3}>
        <Flex
          overflow="hidden"
          borderRadius="sm"
          position="relative"
          maxWidth="140px"
          width="100%"
          flexShrink={0}
        >
          <Image
            src={props.productUrl}
            borderRadius="sm"
            width="100%"
            height="auto"
            objectFit="cover"
            sx={{
              aspectRatio: "35/54",
            }}
          />
          {props.bookType === "sample" && (
            <Text
              fontSize="xs"
              position="absolute"
              top={0}
              right={0}
              letterSpacing="1px"
              textAlign="center"
              width="100%"
              background="bgPrimary"
              transform="rotate(45deg) translateY(-14px) translateX(41px)"
            >
              SAMPLE
            </Text>
          )}
          <Box
            transition="all 0.2s"
            position="absolute"
            marginTop="2px"
            bottom={0}
            left={0}
            right={0}
            height="4px"
            as="progress"
            width="100%"
            max={100}
            min={0}
            sx={{
              "&[value]::-webkit-progress-bar": {
                background: "transparent",
              },
              "&[value]::-webkit-progress-value": {
                background:
                  "linear-gradient(to left, var(--chakra-colors-brand-100), var(--chakra-colors-brand-80))",
              },
            }}
            value={Math.ceil(props.percentageRead)}
          />
        </Flex>
        <Flex direction="column" gap="3px">
          <Tag
            fontSize="xs"
            background="bgPrimary"
            transition="all 0.2s"
            color="text.200"
            width="max-content"
            borderWidth="1px"
            borderColor="borderSubtle"
          >
            {props.percentageRead === 100
              ? "Finished"
              : `Read ${percentageText}%`}
          </Tag>
          <Text fontWeight="medium" fontSize={["sm", "md"]} color="text.100">
            {props.title}
          </Text>
          <Text fontSize={["sm", "medium"]} color="text.300">
            {author}
          </Text>
          <Text fontSize="sm" mt="auto" color="text.500">
            Last read{" "}
            {formatDistance(new Date(props.progress.syncDate), new Date(), {
              addSuffix: true,
            })}
          </Text>
        </Flex>
      </Flex>
      <Image
        transition="all 0.2s"
        _groupHover={{ opacity: 0.14 }}
        zIndex={-100 + -1 * (props.index + 1)}
        transform={"scale(1.15) rotate(-5deg)"}
        opacity={0.08}
        background="rgb(0 0 0 / 0.04)"
        src={props.productUrl}
        width="100%"
        objectPosition="center center"
        objectFit="cover"
        position="absolute"
        top={0}
        right={0}
      />
    </Box>
  )
}

export function Books() {
  const data = useStaticQuery(QUERY)
  return (
    <Grid gap={4} gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))">
      {data.kindle.books
        .filter(book => book.percentageRead > 0)
        .map((book, i, arr) => (
          <Book key={book.asin} index={arr.length - i} {...book} />
        ))}
    </Grid>
  )
}

const QUERY = graphql`
  query Books {
    kindle {
      books {
        title
        asin
        authors {
          firstName
          lastName
        }
        bookType
        percentageRead
        productUrl
        progress {
          position
          syncDate
        }
      }
    }
  }
`
