import { inspect } from "util";
import { graphql } from "../../generated/gql";
import { GRAPHQL_URL, executeOperation } from "./graphql";
import type { MeQuery } from "generated/gql/graphql";

const query = graphql(`
  query Me($filter: KindleFilterType) {
    books: kindleBooks(filter: $filter) {
      title
      author
      asin
      coverUrl
      progress
      readAt
    }

    likedSongs: spotifyLikedSongs {
      likedAt
      song {
        title
        artist
        coverUrl
        spotifyUrl
        previewUrl
        durationMs
      }
    }

    tv {
      simklId
      title
      lastWatchedAt
      episode
      nextEpisode
      simklLink
    }
  }
`);

export const meQuery = executeOperation(GRAPHQL_URL, query, {
  filter: "PURCHASED",
}).then((r) => {
  if (r.errors) {
    console.log(inspect(r.errors, { depth: Infinity, colors: true }));
    throw new Error("Failed to execute GraphQL query");
  }
  return r.data as MeQuery;
});
