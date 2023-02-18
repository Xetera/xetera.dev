import { today, withCache } from "./persistence";
import type { PlaylistTrack } from "spotify-types";

const { SPOTIFY_REFRESH_TOKEN, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } =
	import.meta.env;

const authorization = Buffer.from(
	`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`,
).toString("base64");

export type GetSpotifyTracks = {
	tracks: { items: PlaylistTrack[] };
	likedTracks: { items: PlaylistTrack[] };
};

export const getSpotifyTracks = withCache(
	`tracks-${today()}.json`,
	async (): Promise<GetSpotifyTracks> => {
		// forced to always get a new token because the spotify API is really nice and intuitive :)
		const params = new URLSearchParams({
			grant_type: "refresh_token",
			// this is hardcoded because I did the flow manually and spotify sucks and needs oauth
			// for something that should be doable through client credentials...
			redirect_uri: "https://localhost:40751/.netlify/functions/spotify",
			scope:
				"user-read-email user-read-private user-top-read user-library-read",
			refresh_token: SPOTIFY_REFRESH_TOKEN!,
		});

		const response = await fetch("https://accounts.spotify.com/api/token", {
			method: "POST",
			headers: {
				"content-type": "application/x-www-form-urlencoded",
				authorization: `Basic ${authorization}`,
			},
			body: params.toString(),
		});

		const body = await response.json();
		if (!response.ok) {
			console.log("Spotify fetcher response was not ok", response.status);
			console.log(body);
			throw new Error(
				`Response not ok: ${response.status} = ${response.statusText}`,
			);
		}

		if (!body) {
			throw new Error("Invalid body");
		}

		const token = body.access_token;
		const tracks = await fetch(
			"https://api.spotify.com/v1/me/top/tracks?time_range=short_term",
			{
				headers: { authorization: `Bearer ${token}` },
			},
		).then((res) => res.json());

		const likedTracks = await fetch("https://api.spotify.com/v1/me/tracks", {
			headers: { authorization: `Bearer ${token}` },
		}).then((res) => res.json());

		return { tracks, likedTracks };
	},
);
