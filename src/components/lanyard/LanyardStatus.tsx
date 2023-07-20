import { Data as LanyardData, Spotify, useLanyardWS } from "use-lanyard";
import { RiSpotifyFill } from "react-icons/ri/index.js";
import { useEffect, ReactNode, useState } from "react";
import { SongSkeletonDetails } from "🧱/spotify/SpotifySongSkeleton";
import { resizeSpotifyImageTo } from "🧱/spotify/resizer";
import cls from "classnames";
import styles from "./LanyardStatus.module.css";

function PresenceHeader({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-2 items-center">
      {icon}
      <span className="font-semibold">{children}</span>
    </div>
  );
}

function formatSeconds(seconds: number): string {
  const minutes: number = Math.floor(seconds / 60);
  seconds = seconds % 60;

  const formattedMinutes: string =
    minutes < 10 ? "0" + minutes : minutes.toString();
  const formattedSeconds: string =
    seconds < 10 ? "0" + seconds : seconds.toString();

  return `${formattedMinutes}:${formattedSeconds}`;
}

function SpotifyProgress({
  start,
  end,
  className,
}: {
  start: number;
  end: number;
  className?: string;
}) {
  const [progress, setProgress] = useState(Date.now());

  // this isn't the best way to do timers but it works ok
  // since we're working with time based boundaries and
  // not doing seconds += 1
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, [setProgress]);

  const current = Math.floor((progress - start) / 1000);
  const max = Math.floor((end - start) / 1000);

  return (
    <div className="flex flex-wrap items-center gap-4">
      <progress
        value={current}
        max={max}
        className={cls(
          "flex-1 min-w-70% h-[4px] rounded overflow-hidden",
          styles.progress,
          className,
        )}
      />
      <span className="text-xs font-mono color-text-200 whitespace-nowrap">
        {formatSeconds(current)}/{formatSeconds(max)}
      </span>
    </div>
  );
}

function SpotifyPresence({ spotify }: { spotify: Spotify }) {
  return (
    <div className="flex flex-col gap-4">
      <PresenceHeader icon={<RiSpotifyFill size={20} />}>
        <h2>I'm Listening to</h2>
      </PresenceHeader>
      <div className="relative">
        <div className="flex flex-col gap-3">
          <div className="bg-body-800 rounded overflow-hidden flex items-center justify-between">
            <div className="flex overflow-hidden">
              {spotify.album_art_url ? (
                <img
                  alt={`Album art for ${spotify.song} by ${spotify.artist}`}
                  width={64}
                  height={64}
                  src={resizeSpotifyImageTo(spotify.album_art_url, 64)}
                  loading="lazy"
                  className="aspect-ratio-1 object-cover h-[64px] w-[64px]"
                />
              ) : (
                <div />
              )}
              <SongSkeletonDetails
                className="px-3 py-1"
                title={spotify.song}
                artist={spotify.artist}
              />
            </div>
            {/* <RiPlayCircleFill size={32} className="me-4" /> */}
          </div>
          <SpotifyProgress
            start={spotify.timestamps.start}
            end={spotify.timestamps.end}
          />
        </div>
      </div>
    </div>
  );
}

function Presence({
  data,
  className,
}: {
  data: LanyardData;
  className?: string | undefined;
}) {
  if (data.spotify) {
    return (
      <div className={className}>
        <span className="color-text-500">
          <SpotifyPresence spotify={data.spotify} />
        </span>
      </div>
    );
  }

  return null;
}

export function LanyardStatus(opts: {
  discordId: `${bigint}`;
  className?: string;
}) {
  const data = useLanyardWS(opts.discordId);

  if (!data) {
    return null;
  }

  return <Presence className={opts.className} data={data} />;
}
