import React from "react"
import { graphql } from "gatsby"
import {
  Box,
  Flex,
  Grid,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/layout"
import { Tag } from "@chakra-ui/tag"
import { postPreviewDimensions } from "../shared"
import { GatsbyImage } from "gatsby-plugin-image"

export default function PostPreview(props) {
  const data = props.data.mdx
  const { thumbnail = {} } = data.frontmatter

  return (
    <Flex
      position="relative"
      overflow="hidden"
      background="gray.900"
      width={`${postPreviewDimensions.width}px`}
      height={`${postPreviewDimensions.height}px`}
    >
      {data.frontmatter.imageTop && (
        <GatsbyImage
          width="100%"
          height="100%"
          style={{
            objectFit: "cover",
            height: "100%",
            width: "100%",
            position: "absolute",
            opacity: "0.15",
            filter: "blur(3px)",
          }}
          image={data.frontmatter.imageTop.src.image.gatsbyImageData}
        />
      )}
      <Grid gridTemplateColumns="70% 30%" alignItems="center">
        <Flex
          justifyContent="space-between"
          flexDirection="column"
          height="100%"
          padding={12}
        >
          <VStack spacing={4} m={0} alignItems="flex-start" zIndex={2}>
            <Flex
              flexFlow="row"
              fontSize="xl"
              color="gray.400"
              fontWeight="medium"
              alignItems="center"
            >
              <Text
                as="time"
                color="inherit"
                dateTime={data.frontmatter.date}
                textShadow="1px 1px rgba(0, 0, 0, 0.8)"
              >
                {data.frontmatter.date}
              </Text>
              <Box mx="15px" color="inherit" fontSize="14px">
                ●
              </Box>
              <Text color="inherit">{data.fields.readingTime.text}</Text>
            </Flex>
            <Heading color="gray.50" fontSize="5xl" fontWeight="bold">
              {data.frontmatter.title}
            </Heading>
            <Text
              color="gray.300"
              fontWeight="medium"
              fontSize="2xl"
              lineHeight="1.4"
            >
              {data.frontmatter.description}
            </Text>
          </VStack>
          <HStack spacing={6} zIndex="2">
            {data.frontmatter.tags?.map(tag => (
              <Tag
                key={tag}
                fontSize="xl"
                py={2}
                px={8}
                borderRadius="full"
                background="rgba(60, 64, 72, 0.67)"
                color="#b8bcc7"
              >
                {tag}
              </Tag>
            ))}
          </HStack>
        </Flex>
        <Flex
          clipPath="polygon(24% 0, 100% 0, 100% 100%, 0 100%)"
          height="100%"
          width="100%"
        >
          <GatsbyImage
            imgStyle={{
              objectFit: "cover",
              objectPosition: thumbnail?.objectPosition ?? "40%",
            }}
            image={
              thumbnail?.src?.image?.gatsbyImageData ??
              props.data.avatar.image.gatsbyImageData
            }
          />
        </Flex>
      </Grid>
    </Flex>
  )
}

export const query = graphql`
  fragment CoverStatic on File {
    image: childImageSharp {
      gatsbyImageData(quality: 90, layout: FULL_WIDTH)
    }
  }

  query PreviewPage($slug: String!) {
    avatar: file(absolutePath: { regex: "/avatars/xetera.png/" }) {
      image: childImageSharp {
        gatsbyImageData(width: 600, height: 600, layout: FIXED, quality: 100)
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      fields {
        readingTime {
          text
        }
      }
      frontmatter {
        draft
        title
        tags
        date(formatString: "MMMM DD, YYYY")
        description
        thumbnail {
          objectPosition
          src {
            image: childImageSharp {
              gatsbyImageData(quality: 100, height: 600, layout: CONSTRAINED)
            }
          }
        }
        imageTop {
          src {
            ...CoverStatic
          }
          opacity
        }
      }
    }
  }
`
