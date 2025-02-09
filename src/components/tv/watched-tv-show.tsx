import cls from "clsx";
import type { meQuery } from "🛠️/me";

export interface Props {
  show: Awaited<typeof meQuery>["tv"][number];
  selected?: number;
  i?: number;
}

function parseEpisode(text: string) {
  return {
    season: /S0?(\d+)/.exec(text)?.[1],
    episode: /E0?(\d+)/.exec(text)?.[1],
  };
}

export default function WatchedTvShow({ show, selected, i }: Props) {
  const { episode, season } = parseEpisode(show.episode);
  if (!show.coverUrl) {
    throw new Error("Invalid coverUrl, empty");
  }

  const isSelected = selected === i || typeof selected === "undefined";
  return (
    <a
      href={show.simklLink ?? "#"}
      rel="nofollower noopener external"
      className={cls("flex flex-col gap-1 w-full h-full")}
    >
      <img
        src={show.coverUrl}
        alt={`Cover for ${show.title}`}
        className={cls(
          "rounded mb-2 max-h-[200px] object-cover h-full w-full ease-out transition-all aspect-ratio-[9/16]",
          isSelected ? "opacity-100" : "opacity-20%"
        )}
      />
      <div className="flex flex-col gap-1">
        <h3
          className={cls(
            "font-medium whitespace-nowrap overflow-hidden",
            isSelected ? "color-text-800" : "color-text-100 opacity-50%"
          )}
        >
          {show.title}
        </h3>
        <span
          className={cls(
            "text-xs flex gap-1",
            isSelected ? "color-text-300" : "color-text-100 opacity-50%"
          )}
        >
          {season !== undefined && <p>S{season}</p>}
          {episode !== undefined && (
            <>
              {season && "·"} <p>E{episode}</p>
            </>
          )}
        </span>
      </div>
    </a>
  );
}
