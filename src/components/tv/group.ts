import type { meQuery } from "🛠️/me";

export type Show = Awaited<typeof meQuery>["tv"][number];

export type ShowGroup = {
	key: string;
	latest: Show;
	earliest: Show;
	count: number;
};

export function groupShows(shows: Show[]): ShowGroup[] {
	const groups: ShowGroup[] = [];
	for (const show of shows) {
		const last = groups.at(-1);
		if (last && last.latest.simklId === show.simklId) {
			last.earliest = show;
			last.count++;
		} else {
			groups.push({
				key: `${show.simklId}-${show.episode}`,
				latest: show,
				earliest: show,
				count: 1,
			});
		}
	}
	return groups;
}

function parseEpisode(text: string) {
	return {
		season: /S0?(\d+)/.exec(text)?.[1],
		episode: /E0?(\d+)/.exec(text)?.[1],
	};
}

function formatSingle(season?: string, episode?: string, separator = " · ") {
	return [season && `S${season}`, episode && `E${episode}`]
		.filter(Boolean)
		.join(separator);
}

export function formatEpisodes(group: ShowGroup) {
	const latest = parseEpisode(group.latest.episode ?? "");
	if (group.count === 1) {
		return formatSingle(latest.season, latest.episode);
	}
	const earliest = parseEpisode(group.earliest.episode ?? "");
	if (earliest.season === latest.season) {
		return `${formatSingle(latest.season)} · E${earliest.episode}–${latest.episode}`;
	}
	return `${formatSingle(earliest.season, earliest.episode, " ")} – ${formatSingle(latest.season, latest.episode, " ")}`;
}
