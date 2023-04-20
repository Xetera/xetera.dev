/* eslint-disable */
import * as types from './graphql.js';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query Me {\n    books: kindleBooks {\n      title\n      author\n      asin\n      coverUrl\n      progress\n      readAt\n    }\n\n    likedSongs: spotifyLikedSongs {\n      likedAt\n      song {\n        title\n        artist\n        coverUrl\n        spotifyUrl\n        previewUrl\n        durationMs\n      }\n    }\n\n    tv {\n      simklId\n      title\n      lastWatchedAt\n      episode\n      nextEpisode\n      simklLink\n    }\n  }\n": types.MeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Me {\n    books: kindleBooks {\n      title\n      author\n      asin\n      coverUrl\n      progress\n      readAt\n    }\n\n    likedSongs: spotifyLikedSongs {\n      likedAt\n      song {\n        title\n        artist\n        coverUrl\n        spotifyUrl\n        previewUrl\n        durationMs\n      }\n    }\n\n    tv {\n      simklId\n      title\n      lastWatchedAt\n      episode\n      nextEpisode\n      simklLink\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    books: kindleBooks {\n      title\n      author\n      asin\n      coverUrl\n      progress\n      readAt\n    }\n\n    likedSongs: spotifyLikedSongs {\n      likedAt\n      song {\n        title\n        artist\n        coverUrl\n        spotifyUrl\n        previewUrl\n        durationMs\n      }\n    }\n\n    tv {\n      simklId\n      title\n      lastWatchedAt\n      episode\n      nextEpisode\n      simklLink\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;