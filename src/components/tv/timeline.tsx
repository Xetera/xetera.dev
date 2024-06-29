import type { meQuery } from "🛠️/me";
import cls from "classnames"
import minBy from "lodash/minBy";
import { sub } from "date-fns/sub";
import { differenceInDays } from "date-fns/differenceInDays";
import { formatDistance } from "date-fns/formatDistance";

export interface Props {
  shows: Awaited<typeof meQuery>["tv"];
  selected?: string
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

  const currentHovering = props.shows.find(show => show.simklId === props.selected)
  const currentWatched = currentHovering ? formatDistance(currentHovering?.lastWatchedAt, new Date(), { addSuffix: true }) : undefined;
  return (
    <div className="relative flex items-center">
      <p className="absolute -left-4 whitespace-nowrap bottom-4 -rotate-8 text-sm">Today</p>
      <div className="bg-body-300 w-3 h-3 rounded-full absolute left-0"></div>

      <div className="h-[2px] w-full bg-body-300"></div>

      {currentWatched && <p className="absolute left-50% -translate-x-50% bottom-4 color-text-300">Watched {currentWatched}</p >}

      {
        props.shows.toReversed().map((show) => {
          const difference = differenceInDays(
            new Date(),
            new Date(show.lastWatchedAt),
          );
          const offset = (((scale - difference) / scale) * 100).toFixed(1);
          return (
            <div
              key={show.simklId}
              style={{ right: `${offset}%` }}
              className={cls("bg-body-300 w-4 h-4 rounded absolute right-0 outline outline-1 outline-text-100", (props.selected === show.simklId || typeof props.selected === "undefined") ? "opacity-100" : "opacity-20%")
              }
            />
          );
        })
      }
      <div className="bg-body-300 w-3 h-3 rounded-full absolute right-0"></div>
      <p className="absolute bottom-4 -right-4 rotate-4 text-sm">
        {formatDistance(earliestDate, new Date(), { addSuffix: true })}
      </p>
    </div>
  )
}
