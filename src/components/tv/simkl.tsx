import cls from "classnames"
import type { meQuery } from "🛠️/me";
import styles from "./simkl.module.css";
import WatchedTvShow from "./watched-tv-show";
import Timeline from "./timeline";
import SectionHeader from "🧱/section-header";
import HomepageSection from "🧱/homepage-section";
import { useState } from "react";


const DIVIDER = 5;

export default function Simkl({ tv }: { tv: Awaited<typeof meQuery>['tv'] }) {
  const [selected, setSelected] = useState<number | undefined>();

  const firstFourShows = tv.slice(0, DIVIDER);
  const secondFourShows = tv.slice(DIVIDER, DIVIDER + DIVIDER);
  return <HomepageSection>
    <SectionHeader>Shows I've watched recently 👀</SectionHeader>

    <div className={cls(styles.simklGrid, "gap-4 lg:gap-6 flex-wrap")} onMouseLeave={() => setSelected(undefined)}>
      {firstFourShows.map((show, i) =>
        <div onMouseEnter={() => setSelected(i)} key={show.simklId}>
          <WatchedTvShow show={show} selected={selected} i={i} />
        </div>
      )}
    </div>

    <div className="mt-10 mb-4 hidden sm:block">
      <Timeline shows={tv.slice(0, DIVIDER * 2)} selected={selected} />
    </div>

    <div className={cls(styles.simklGrid, "gap-4 lg:gap-6 flex-wrap")} onMouseLeave={() => setSelected(undefined)}>
      {secondFourShows.map((show, i) =>
        <div onMouseEnter={() => setSelected(DIVIDER + i)} key={show.simklId} >
          <WatchedTvShow show={show} selected={selected} i={DIVIDER + i} />
        </div>
      )}
    </div>
  </HomepageSection >
}
