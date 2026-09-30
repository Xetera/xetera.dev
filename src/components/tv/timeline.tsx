import cls from "clsx";
import minBy from "lodash/minBy";
import { sub } from "date-fns/sub";
import { differenceInDays } from "date-fns/differenceInDays";
import { formatDistance } from "date-fns/formatDistance";
import type { ShowGroup } from "./group";

export interface Props {
	groups: ShowGroup[];
	selected?: number;
}

export default function Timeline(props: Props) {
	const earliestWatched = minBy(
		props.groups,
		(group) => new Date(group.earliest.lastWatchedAt),
	)?.earliest;
	const comparisonDate = sub(new Date(), { months: 1 });

	const earliestDate =
		new Date(earliestWatched?.lastWatchedAt) < comparisonDate
			? new Date(earliestWatched?.lastWatchedAt)
			: comparisonDate;

	const scale = differenceInDays(new Date(), earliestDate);

	function offsetOf(date: string) {
		const difference = differenceInDays(new Date(), new Date(date));
		return ((scale - difference) / scale) * 100;
	}

	const currentHovering =
		props.selected !== undefined ? props.groups[props.selected] : undefined;
	const currentWatched = currentHovering
		? formatDistance(currentHovering.latest.lastWatchedAt, new Date(), {
				addSuffix: true,
			})
		: undefined;
	return (
		<div className="relative flex items-center color-text-200 uppercase font-medium text-xs tracking-widest">
			<p className="absolute left-0 whitespace-nowrap bottom-3">Today</p>

			<div className="h-[1px] w-full bg-body-700" />

			{currentHovering && currentWatched && (
				<p className="absolute left-50% -translate-x-50% bottom-3 whitespace-nowrap color-text-400">
					{currentHovering.count > 1
						? `${currentHovering.count} episodes, last ${currentWatched}`
						: `Watched ${currentWatched}`}
				</p>
			)}

			{props.groups.map((group, i) => {
				const start = offsetOf(group.earliest.lastWatchedAt);
				const end = offsetOf(group.latest.lastWatchedAt);
				const hovering = props.selected === i;
				const span = end - start;
				return (
					<div
						key={group.key}
						style={{
							right: `${start.toFixed(1)}%`,
							width: span > 0 ? `calc(${span.toFixed(1)}% + 0.5rem)` : "0.5rem",
						}}
						className={cls(
							"transition-colors duration-250 absolute h-2 translate-x-1 rounded-full",
							hovering ? "bg-brand-900 z-1" : "bg-body-400",
						)}
					/>
				);
			})}
			<p className="absolute bottom-3 right-0">Earlier</p>
		</div>
	);
}
