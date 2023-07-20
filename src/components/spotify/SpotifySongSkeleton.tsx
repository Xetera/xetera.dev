import type { PropsWithChildren, ReactElement } from "react";
import cls from "classnames";

export function SongSkeletonDetails(props: {
  title: string;
  artist: string;
  className?: string;
}) {
  return (
    <div
      className={cls(
        "flex flex-col justify-center overflow-hidden",
        props.className,
      )}
    >
      <h2
        aria-label="Track name"
        className="color-text-800 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
      >
        {props.title}
      </h2>
      <h3
        aria-label="Track artist"
        className="color-text-300 text-sm whitespace-nowrap overflow-hidden text-ellipsis"
      >
        {props.artist}
      </h3>
    </div>
  );
}

export function SongSkeleton(
  props: PropsWithChildren<{
    title: string;
    artist: string;
    image?: ReactElement;
  }>,
) {
  return (
    <article className="flex gap-3 justify-between items-center">
      <div className="items-center flex gap-3 w-full">
        {props.image}
        <SongSkeletonDetails title={props.title} artist={props.artist} />
      </div>
      {props.children}
    </article>
  );
}
