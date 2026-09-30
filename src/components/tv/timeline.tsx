import type { meQuery } from "🛠️/me";
import cls from "clsx";
import minBy from "lodash/minBy";
import { sub } from "date-fns/sub";
import { differenceInDays } from "date-fns/differenceInDays";
import { formatDistance } from "date-fns/formatDistance";

export interface Props {
  shows: Awaited<typeof meQuery>["tv"];
  selected?: number
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
		<div className="relative flex items-center color-text-200 uppercase font-medium text-xs tracking-widest">
			<p className="absolute left-0 whitespace-nowrap bottom-3">Today</p>

			<div className="h-[1px] w-full bg-body-700" />

			{currentWatched && (
				<p className="absolute left-50% -translate-x-50% bottom-3 whitespace-nowrap color-text-400">
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
							"transition-all duration-250 w-2 h-2 absolute right-0 translate-x-1/2 rounded-full",
							hovering ? "bg-brand-900 scale-150" : "bg-body-400",
						)}
					/>
				);
			})}
			<p className="absolute bottom-3 right-0">Earlier</p>
		</div>
	);
}
