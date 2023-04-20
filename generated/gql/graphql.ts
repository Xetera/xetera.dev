/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type Book = {
  __typename?: 'Book';
  /** Amazon Standard Identification Number */
  asin: Scalars['String'];
  /** Author of the book. Only the first author is shown. */
  author: Scalars['String'];
  /** URL to the cover image */
  coverUrl: Scalars['String'];
  /** Device the book was read on. */
  device?: Maybe<Scalars['String']>;
  /** The first time this book was seen on the Kindle API */
  firstSeen: Scalars['DateTime'];
  /** Percentage of the book read. Books with 0 percentage reads are not shown. */
  progress: Scalars['Float'];
  /** The last date this book was read */
  readAt: Scalars['DateTime'];
  /** Title of the book */
  title: Scalars['String'];
};

export type LikedSong = {
  __typename?: 'LikedSong';
  /** The date the song was liked */
  likedAt: Scalars['DateTime'];
  song: Song;
};

export type Query = {
  __typename?: 'Query';
  kindleBooks: Array<Book>;
  spotifyLikedSongs: Array<LikedSong>;
  tv: Array<Tv>;
};

export type Song = {
  __typename?: 'Song';
  /** Album of the song */
  album: Scalars['String'];
  /** Artist of the song */
  artist: Scalars['String'];
  /** Album art of the song */
  coverUrl: Scalars['String'];
  /** Duration of the song in milliseconds */
  durationMs: Scalars['Int'];
  /** A 30 second preview of the song */
  previewUrl?: Maybe<Scalars['String']>;
  /** Spotify URL of the song */
  spotifyUrl?: Maybe<Scalars['String']>;
  /** Title of the song */
  title: Scalars['String'];
};

export type Tv = {
  __typename?: 'TV';
  coverUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  episode: Scalars['String'];
  lastWatchedAt: Scalars['DateTime'];
  nextEpisode?: Maybe<Scalars['String']>;
  simklId: Scalars['String'];
  simklLink?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', books: Array<{ __typename?: 'Book', title: string, author: string, asin: string, coverUrl: string, progress: number, readAt: any }>, likedSongs: Array<{ __typename?: 'LikedSong', likedAt: any, song: { __typename?: 'Song', title: string, artist: string, coverUrl: string, spotifyUrl?: string | null, previewUrl?: string | null, durationMs: number } }>, tv: Array<{ __typename?: 'TV', simklId: string, title: string, lastWatchedAt: any, episode: string, nextEpisode?: string | null, simklLink?: string | null }> };


export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"books"},"name":{"kind":"Name","value":"kindleBooks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"asin"}},{"kind":"Field","name":{"kind":"Name","value":"coverUrl"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"readAt"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"likedSongs"},"name":{"kind":"Name","value":"spotifyLikedSongs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likedAt"}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"coverUrl"}},{"kind":"Field","name":{"kind":"Name","value":"spotifyUrl"}},{"kind":"Field","name":{"kind":"Name","value":"previewUrl"}},{"kind":"Field","name":{"kind":"Name","value":"durationMs"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"tv"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"simklId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"lastWatchedAt"}},{"kind":"Field","name":{"kind":"Name","value":"episode"}},{"kind":"Field","name":{"kind":"Name","value":"nextEpisode"}},{"kind":"Field","name":{"kind":"Name","value":"simklLink"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;