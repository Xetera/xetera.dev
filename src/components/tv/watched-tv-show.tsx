import cls from "classnames"
import type { meQuery } from "🛠️/me";
import { formatDistance } from "date-fns";

export interface Props {
  show: Awaited<typeof meQuery>["tv"][number];
  selected?: string
}

function parseEpisode(text: string) {
  return {
    season: /S0?(\d+)/.exec(text)?.[1],
    episode: /E0?(\d+)/.exec(text)?.[1],
  };
}


export default function WatchedTvShow({ show, selected }: Props) {
  const { episode, season } = parseEpisode(show.episode);
  if (!show.coverUrl) {
    throw new Error("Invalid coverUrl, empty")
  }

  return <a
    href={show.simklLink ?? "#"}
    rel="nofollower noopener external"
    className={cls("flex flex-col gap-1 w-full",)}

  >
    <img
      src={show.coverUrl}
      className={cls("rounded mb-2 w-full max-h-[280px] object-cover w-full h-full ease-out transition-all", (selected === show.simklId || typeof selected === "undefined") ? "opacity-100" : "opacity-20%")}
    />
    <div className="flex flex-col gap-1">
      <h3 className="color-text-800 font-medium whitespace-nowrap overflow-hidden">
        {show.title}
      </h3>
      <span className="text-sm flex gap-2">
        {season !== undefined && <p className="color-text-300">Season {season}</p>}
        {
          episode !== undefined && (
            <>
              {season && "·"} <p className="color-text-300">Episode {episode}</p>
            </>
          )
        }
      </span>
    </div>
  </a>

}
