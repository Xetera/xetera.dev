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

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, [setProgress]);

  return (
    <progress
      value={progress - start}
      max={end - start}
      className={cls("w-full h-[4px]", styles.progress, className)}
    />
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
            className="overflow-hidden rounded"
            start={spotify.timestamps.start}
            end={spotify.timestamps.end}
          />
        </div>
      </div>
    </div>
  );
}

function Presence({ data }: { data: LanyardData }) {
  if (data.spotify) {
    return (
      <div>
        <span className="color-text-500">
          <SpotifyPresence spotify={data.spotify} />
        </span>
      </div>
    );
  }

  return null;
  // else if (data.active_on_discord_mobile) {
  //   return (
  //     <PresenceHeader icon={<RiSmartphoneFill />}>
  //       <h2>Online on my phone</h2>
  //     </PresenceHeader>
  //   );
  // }
  // else if (data.active_on_discord_desktop || data.active_on_discord_web) {
  //   return (
  //     <PresenceHeader icon={<RiComputerFill />}>
  //       <h2>Online</h2>
  //     </PresenceHeader>
  //   );
  // }
}

export function LanyardStatus(opts: { discordId: `${bigint}` }) {
  const data = useLanyardWS(opts.discordId);

  if (!data) {
    return null;
  }

  return <Presence data={data} />;
}
