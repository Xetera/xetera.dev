import cls from "clsx";
import type { meQuery } from "🛠️/me";
import styles from "./simkl.module.css";
import WatchedTvShow from "./watched-tv-show";
import Timeline from "./timeline";
import { groupShows } from "./group";
import SectionHeader from "🧱/section-header";
import HomepageSection from "🧱/homepage-section";
import { useEffect, useMemo, useState } from "react";

type SSRMediaMatch = {
	matches: boolean;
	addEventListener?(key: string, f: (val: MediaQueryListEvent) => void): void;
	removeEventListener?(
		key: string,
		f: (val: MediaQueryListEvent) => void,
	): void;
};

function ssrMatchMedia(query: string): SSRMediaMatch {
	if (typeof window === "undefined") {
		return { matches: false };
	}
	return matchMedia(query);
}

export default function Simkl({ tv }: { tv: Awaited<typeof meQuery>["tv"] }) {
	const [selected, setSelected] = useState<number | undefined>();
	const isPhone = useMemo(() => ssrMatchMedia("(min-width: 410px)"), []);
	const isTablet = useMemo(() => ssrMatchMedia("(min-width: 580px)"), []);
	const isDesktop = useMemo(() => ssrMatchMedia("(min-width: 760px)"), []);
	const conditions: Array<[SSRMediaMatch, number]> = useMemo(
		() => [
			[isPhone, 3],
			[isTablet, 4],
			[isDesktop, 5],
		],
		[isPhone, isTablet, isDesktop],
	);
	const [divider, setDivider] = useState(() => calculateDivider(conditions));
	useEffect(() => {
		function f() {
			setDivider(calculateDivider(conditions));
		}
		for (const [cond] of conditions) {
			cond.addEventListener?.("change", f);
		}
		return () => {
			for (const [cond] of conditions) {
				cond.removeEventListener?.("change", f);
			}
		};
	}, [conditions]);

	const groups = useMemo(() => groupShows(tv), [tv]);
	const firstFourShows = groups.slice(0, divider);
	const secondFourShows = groups.slice(divider, divider * 2);
	const gridStyle = {
		gridTemplateColumns: `repeat(${divider}, minmax(0, 1fr))`,
	};
	return (
		<HomepageSection>
			<SectionHeader>Shows I've recently watched 👀</SectionHeader>

			<div
				className={cls(styles.simklGrid, "gap-4 lg:gap-6 flex-wrap")}
				style={gridStyle}
				onMouseLeave={() => setSelected(undefined)}
			>
				{firstFourShows.map((group, i) => (
					<div onMouseEnter={() => setSelected(i)} key={group.key}>
						<WatchedTvShow group={group} selected={selected} i={i} />
					</div>
				))}
			</div>

			<div className="mt-10 mb-4 hidden sm:block">
				<Timeline groups={groups.slice(0, divider * 2)} selected={selected} />
			</div>

			<div
				className={cls(styles.simklGrid, "gap-4 lg:gap-6 flex-wrap")}
				style={gridStyle}
				onMouseLeave={() => setSelected(undefined)}
			>
				{secondFourShows.map((group, i) => (
					<div onMouseEnter={() => setSelected(divider + i)} key={group.key}>
						<WatchedTvShow
							group={group}
							selected={selected}
							i={divider + i}
						/>
					</div>
				))}
			</div>
		</HomepageSection>
	);
}

function calculateDivider(conditions: Array<[{ matches: boolean }, number]>) {
	if (typeof window === "undefined") {
		return 5;
	}
	for (let i = conditions.length - 1; i >= 0; i--) {
		const condition = conditions[i];
		if (!condition) {
			throw new Error("Invalid iteration");
		}
		const [{ matches }, columns] = condition;
		if (matches) {
			return columns;
		}
	}
	return 2;
}
