/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: any; output: any; }
};

export type Book = {
  __typename?: 'Book';
  /** Amazon Standard Identification Number */
  asin: Scalars['String']['output'];
  /** Author of the book */
  author: Scalars['String']['output'];
  /** URL to the cover image */
  coverUrl: Scalars['String']['output'];
  device?: Maybe<Scalars['String']['output']>;
  /** The first time this book was seen on the Kindle API */
  firstSeenAt: Scalars['Date']['output'];
  /** Whether this book was purchased */
  isPurchased: Scalars['Boolean']['output'];
  /** Percentage of the book read. Books with 0 percentage reads are not shown. */
  progress: Scalars['Float']['output'];
  /** The last date this book was read */
  readAt?: Maybe<Scalars['Date']['output']>;
  /** Title of the book */
  title: Scalars['String']['output'];
};

export enum ImageSize {
  /** 640px square image */
  Large = 'LARGE',
  /** 300px square image */
  Medium = 'MEDIUM',
  /** 64px square image */
  Small = 'SMALL'
}

export enum KindleFilterType {
  /** Include all read books seen in the user's library */
  All = 'ALL',
  /** Include only books purchased by the user, not samples */
  Purchased = 'PURCHASED'
}

export type LikedSong = {
  __typename?: 'LikedSong';
  /** The date the song was liked */
  likedAt?: Maybe<Scalars['Date']['output']>;
  song: Song;
};

export type Query = {
  __typename?: 'Query';
  kindleBooks: Array<Book>;
  spotifyLikedSongs: Array<LikedSong>;
  tv: Array<Tv>;
};


export type QueryKindleBooksArgs = {
  filter?: InputMaybe<KindleFilterType>;
};

export type Song = {
  __typename?: 'Song';
  /** Album of the song */
  album: Scalars['String']['output'];
  /** Artist of the song */
  artist: Scalars['String']['output'];
  /** Album art of the song */
  coverUrl: Scalars['String']['output'];
  /** Duration of the song in milliseconds */
  durationMs: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  /** A 30 second preview of the song */
  previewUrl?: Maybe<Scalars['String']['output']>;
  /** Spotify URL of the song */
  spotifyUrl?: Maybe<Scalars['String']['output']>;
  /** Title of the song */
  title: Scalars['String']['output'];
};


export type SongCoverUrlArgs = {
  size?: InputMaybe<ImageSize>;
};

export type Tv = {
  __typename?: 'TV';
  coverUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  episode: Scalars['String']['output'];
  lastWatchedAt?: Maybe<Scalars['Date']['output']>;
  nextEpisode?: Maybe<Scalars['String']['output']>;
  simklId: Scalars['String']['output'];
  simklLink?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type MeQueryVariables = Exact<{
  filter?: InputMaybe<KindleFilterType>;
}>;


export type MeQuery = { __typename?: 'Query', books: Array<{ __typename?: 'Book', title: string, author: string, asin: string, coverUrl: string, progress: number, readAt?: any | null }>, likedSongs: Array<{ __typename?: 'LikedSong', likedAt?: any | null, song: { __typename?: 'Song', title: string, artist: string, coverUrl: string, spotifyUrl?: string | null, previewUrl?: string | null, durationMs: number } }>, tv: Array<{ __typename?: 'TV', simklId: string, title: string, lastWatchedAt?: any | null, coverUrl?: string | null, episode: string, nextEpisode?: string | null, simklLink?: string | null }> };


export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"KindleFilterType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"books"},"name":{"kind":"Name","value":"kindleBooks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"asin"}},{"kind":"Field","name":{"kind":"Name","value":"coverUrl"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"readAt"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"likedSongs"},"name":{"kind":"Name","value":"spotifyLikedSongs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likedAt"}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"coverUrl"}},{"kind":"Field","name":{"kind":"Name","value":"spotifyUrl"}},{"kind":"Field","name":{"kind":"Name","value":"previewUrl"}},{"kind":"Field","name":{"kind":"Name","value":"durationMs"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"tv"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"simklId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"lastWatchedAt"}},{"kind":"Field","name":{"kind":"Name","value":"coverUrl"}},{"kind":"Field","name":{"kind":"Name","value":"episode"}},{"kind":"Field","name":{"kind":"Name","value":"nextEpisode"}},{"kind":"Field","name":{"kind":"Name","value":"simklLink"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;