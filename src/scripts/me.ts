import { inspect } from "node:util";
import { graphql } from "../../generated/gql";
import { GRAPHQL_URL, executeOperation } from "./graphql";
import { KindleFilterType, type MeQuery } from "generated/gql/graphql";

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
      coverUrl
      episode
      nextEpisode
      simklLink
    }
  }
`);

export const meQuery = executeOperation(GRAPHQL_URL, query, {
	filter: KindleFilterType.Purchased,
}).then((r) => {
	if (r.errors) {
		console.log(
			inspect(r.errors, { depth: Number.POSITIVE_INFINITY, colors: true }),
		);
		throw new Error("Failed to execute GraphQL query");
	}
	return r.data as MeQuery;
});
