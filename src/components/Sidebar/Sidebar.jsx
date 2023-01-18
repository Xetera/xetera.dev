import React from "react"
import {
  Box,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Tabs,
  Flex,
  Text,
  LinkBox,
} from "@chakra-ui/react"
import { SpotifyLikedSongs } from "../Music/SpotifyLikedSongs"
import { RiBook2Fill, RiBook3Line, RiSpotifyFill } from "react-icons/ri"
import { graphql, Link, useStaticQuery } from "gatsby"
import { Books } from "./Book"
import { SectionHeader } from "../Typography"
import { StackedSection } from "../Layout"

const selected = {
  color: "text.100",
  borderColor: "borderSubtle",
}

const tab = {
  outline: "none",
  transition: "all 0.2s",
  background: "bookBackground",
  borderRadius: "sm",
  border: "1px solid transparent",
}

export function Sidebar() {
  return (
    <Box>
      <Tabs variant="unstyled" isLazy>
        <TabList
          mb={3}
          color="text.300"
          // borderWidth="1px"
          borderColor="borderSubtle"
          whiteSpace="nowrap"
          gap={2}
        >
          <Tab {...tab} _selected={selected} borderRadius="sm" width="100%">
            <Flex direction="row" gap={2} alignItems="center">
              Reading List
              <RiBook3Line size={20} />
            </Flex>
          </Tab>
          <Tab {...tab} _selected={selected} width="100%">
            <Flex direction="row" gap={2} alignItems="center">
              Liked Songs
              <RiSpotifyFill size={20} />
            </Flex>
          </Tab>
        </TabList>
        <TabPanels mb={2}>
          <TabPanel p={0}>
            <Books />
            <Flex p={3} justifyContent="center">
              <Text fontSize="sm" color="text.300" textAlign="center">
                Reading data pulled from Kindle using{" "}
                <Box
                  as="a"
                  color="brandSecondary"
                  rel="noopener"
                  href="https://github.com/xetera/kindle-api"
                >
                  kindle-api
                </Box>
              </Text>
            </Flex>
          </TabPanel>
          <TabPanel>
            <SpotifyLikedSongs gridArea="spotify" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}
