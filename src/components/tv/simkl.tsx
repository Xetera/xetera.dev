import cls from "clsx";
import type { meQuery } from "🛠️/me";
import styles from "./simkl.module.css";
import WatchedTvShow from "./watched-tv-show";
import Timeline from "./timeline";
import SectionHeader from "🧱/section-header";
import HomepageSection from "🧱/homepage-section";
import { useEffect, useMemo, useState } from "react";

const DIVIDER = 5;

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

	const firstFourShows = tv.slice(0, divider);
	const secondFourShows = tv.slice(divider, divider * 2);
	return (
		<HomepageSection>
			<SectionHeader>Shows I've recently watched 👀</SectionHeader>

			<div
				className={cls(styles.simklGrid, "gap-4 lg:gap-6 flex-wrap")}
				onMouseLeave={() => setSelected(undefined)}
			>
				{firstFourShows.map((show, i) => (
					<div
						onMouseEnter={() => setSelected(i)}
						key={`${show.simklId}-${show.episode}`}
					>
						<WatchedTvShow show={show} selected={selected} i={i} />
					</div>
				))}
			</div>

			<div className="mt-10 mb-4 hidden sm:block">
				<Timeline shows={tv.slice(0, divider * 2)} selected={selected} />
			</div>

			<div
				className={cls(styles.simklGrid, "gap-4 lg:gap-6 flex-wrap")}
				onMouseLeave={() => setSelected(undefined)}
			>
				{secondFourShows.map((show, i) => (
					<div
						onMouseEnter={() => setSelected(divider + i)}
						key={`${show.simklId}-${show.episode}`}
					>
						<WatchedTvShow show={show} selected={selected} i={divider + i} />
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
