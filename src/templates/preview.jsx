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
import { Image } from "@chakra-ui/image"
import { Tag } from "@chakra-ui/tag"
import { themedColors } from "../@chakra-ui/gatsby-plugin/theme"
import { postPreviewDimensions } from "../shared"

export default function PostPreview(props) {
  const data = props.data.mdx
  const { thumbnail = {} } = data.frontmatter
  return (
    <Flex
      position="relative"
      overflow="hidden"
      borderRadius="md"
      background="gray.900"
      width={`${postPreviewDimensions.width}px`}
      height={`${postPreviewDimensions.height}px`}
    >
      {data.frontmatter.imageTop && (
        <Image
          objectFit="cover"
          height="100%"
          zIndex="-1"
          position="absolute"
          opacity="0.25"
          filter="blur(10px)"
          src={data.frontmatter.imageTop.src.image.fluid.src}
        />
      )}
      <Grid gridTemplateColumns="70% 30%" alignItems="center">
        <Flex
          justifyContent="space-between"
          flexDirection="column"
          height="100%"
          padding={12}
        >
          <VStack spacing={4} m={0} alignItems="flex-start">
            <Flex
              flexFlow="row"
              fontSize="xl"
              color="gray.400"
              fontWeight="medium"
              alignItems="center"
            >
              <Text
                as="datetime"
                color="inherit"
                dateTime={data.frontmatter.date}
                textShadow="1px 1px rgba(0, 0, 0, 0.8)"
              >
                {data.frontmatter.date}
              </Text>
              <Box mx="15px" color="inherit" fontSize="md">
                ●
              </Box>
              <Text color="inherit">{data.fields.readingTime.text}</Text>
            </Flex>
            <Heading fontSize="5xl" fontWeight="bold">
              {data.frontmatter.title}
            </Heading>
            <Text
              color="gray.100"
              fontWeight="medium"
              fontSize="2xl"
              lineHeight="1.4"
            >
              {data.frontmatter.description}
            </Text>
          </VStack>
          <HStack spacing={6}>
            {data.frontmatter.tags?.map(tag => (
              <Tag
                key={tag}
                fontSize="xl"
                py={2}
                px={8}
                borderRadius="full"
                background="gray.800"
                color={themedColors.brand.dark}
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
          <Image
            objectFit="cover"
            src={thumbnail.src ?? "https://my.simp.pics/0N_S2_VawgUgB8sW.webp"}
            objectPosition={thumbnail.objectPosition ?? "40%"}
            background="gray.900"
          />
        </Flex>
      </Grid>
    </Flex>
  )
}

export const query = graphql`
  fragment CoverStatic on File {
    image: childImageSharp {
      fluid(quality: 90, maxWidth: 1920) {
        ...GatsbyImageSharpFluid_withWebp
      }
    }
  }
  query PreviewPage($slug: String!) {
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
