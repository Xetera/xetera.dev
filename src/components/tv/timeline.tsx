import type { meQuery } from "🛠️/me";
import cls from "clsx";
import minBy from "lodash/minBy";
import { sub } from "date-fns/sub";
import { differenceInDays } from "date-fns/differenceInDays";
import { formatDistance } from "date-fns/formatDistance";

export interface Props {
	shows: Awaited<typeof meQuery>["tv"];
	selected?: number;
}

export default function Timeline(props: Props) {
	const earliestWatched = minBy(
		props.shows,
		(show) => new Date(show.lastWatchedAt),
	);
	const comparisonDate = sub(new Date(), { months: 1 });

	const earliestDate =
		new Date(earliestWatched?.lastWatchedAt) < comparisonDate
			? new Date(earliestWatched?.lastWatchedAt)
			: comparisonDate;

	const scale = differenceInDays(new Date(), earliestDate);

	const currentHovering =
		props.selected !== undefined ? props.shows[props.selected] : undefined;
	const currentWatched = currentHovering
		? formatDistance(currentHovering?.lastWatchedAt, new Date(), {
				addSuffix: true,
			})
		: undefined;
	return (
		<div className="relative flex items-center">
			<p className="absolute -left-4 whitespace-nowrap bottom-4 -rotate-8 text-sm">
				Today
			</p>
			<div className="bg-body-300 w-3 h-3 rounded-full absolute left-0" />

			<div className="h-[2px] w-full bg-body-300" />

			{currentWatched && (
				<p className="text-sm absolute left-50% -translate-x-50% bottom-4">
					Watched {currentWatched}
				</p>
			)}

			{props.shows.toReversed().map((show, i, arr) => {
				const difference = differenceInDays(
					new Date(),
					new Date(show.lastWatchedAt),
				);
				const offset = (((scale - difference) / scale) * 100).toFixed(1);
				const hovering = props.selected === arr.length - i - 1;
				return (
					<div
						key={`${show.simklId}-${show.episode}`}
						style={{ right: `${offset}%` }}
						className={cls(
							"transition-all w-3 h-3 absolute right-0 rounded",
							hovering ? "bg-text-700" : "bg-body-300",
						)}
					/>
				);
			})}
			<div className="bg-body-300 w-3 h-3 rounded-full absolute right-0" />
			<p className="absolute bottom-4 -right-4 rotate-4 text-sm">Earlier</p>
		</div>
	);
}
