import cls from "clsx";
import { formatEpisodes, type ShowGroup } from "./group";

export interface Props {
	group: ShowGroup;
	selected?: number;
	i?: number;
}

export default function WatchedTvShow({ group, selected, i }: Props) {
	const show = group.latest;
	if (!show.coverUrl) {
		throw new Error("Invalid coverUrl, empty");
	}

	const isSelected = selected === i || typeof selected === "undefined";
	const isStack = group.count > 1;
	return (
		<a
			href={show.simklLink ?? "#"}
			rel="nofollower noopener external"
			className={cls("group flex flex-col gap-1 w-full h-full")}
			data-umami-event="media-timeline:poster-click"
			data-umami-event-title={show.title}
		>
			<div
				className={cls(
					"relative mb-2 transition-all ease-out duration-250 group-hover:-translate-y-1",
					isSelected ? "opacity-100" : "opacity-40%",
				)}
			>
				{isStack && (
					<>
						<div className="absolute inset-0 rounded bg-body-600 outline outline-1 outline-body-700 translate-x-[6px] -translate-y-[6px] transition-transform duration-250 group-hover:translate-x-[9px] group-hover:-translate-y-[9px]" />
						<div className="absolute inset-0 rounded bg-body-500 outline outline-1 outline-body-700 translate-x-[3px] -translate-y-[3px] transition-transform duration-250 group-hover:translate-x-[5px] group-hover:-translate-y-[5px]" />
					</>
				)}
				<img
					src={show.coverUrl}
					alt={`Cover for ${show.title}`}
					className="relative block rounded max-h-[200px] object-cover h-full w-full aspect-ratio-[9/16] outline outline-1 outline-body-700 transition-shadow duration-250 group-hover:shadow-lg"
				/>
			</div>
			<div className="flex flex-col gap-1">
				<h3
					className={cls(
						"font-medium whitespace-nowrap overflow-hidden",
						isSelected ? "color-text-800" : "color-text-100 opacity-50%",
					)}
				>
					{show.title}
				</h3>
				<span
					className={cls(
						"text-xs whitespace-nowrap",
						isSelected ? "color-text-300" : "color-text-100 opacity-50%",
					)}
				>
					{formatEpisodes(group)}
				</span>
			</div>
		</a>
	);
}
