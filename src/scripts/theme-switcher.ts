const modes = ["dark", "light", "system"] as const;

const DEFAULT_THEME_MODE = "system";
const THEME_KEY = "theme";

export type Mode = (typeof modes)[number];

function isMode(input: string): input is Mode {
	return modes.includes(input as Mode);
}

export function getColorMode(): Mode {
	const preferenceRaw = document.cookie.match(/theme=(.+);?/)?.[1];
	const isValid = preferenceRaw && isMode(preferenceRaw);

	const preference = isValid ? preferenceRaw : DEFAULT_THEME_MODE;

	if (!isValid) {
		setThemeDisplay(DEFAULT_THEME_MODE);
	}

	return preference;
}

function setKnownTheme(theme: "dark" | "light") {
	if (theme === "dark") {
		document.documentElement.classList.add("dark");
	} else {
		document.documentElement.classList.remove("dark");
	}
	document.cookie = `${THEME_KEY}=${theme}; Max-Age=31536000`;
}

export function persistTheme(mode: Mode): void {
	localStorage.setItem(THEME_KEY, mode);
}

export function setThemeDisplay(mode: Mode): void {
	if (mode === "system") {
		const shouldBeDark = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;
		setKnownTheme(shouldBeDark ? "dark" : "light");
	} else {
		setKnownTheme(mode);
		persistTheme(mode);
	}
}

export function toggleTheme(): Mode {
	const nextTheme = document.documentElement.classList.contains("dark")
		? "light"
		: "dark";
	setThemeDisplay(nextTheme);
	return nextTheme;
}

export function addThemeChangeListener(f: (mode: "dark" | "light") => void) {
	window
		.matchMedia("(prefers-color-scheme: dark)")
		.addEventListener("change", (e) => {
			const darkModeOn = e.matches;
			f(darkModeOn ? "dark" : "light");
		});
}

export function initializeTheme(): Mode {
	const theme = getColorMode();
	addThemeChangeListener(setKnownTheme);
	setThemeDisplay(theme);
	return theme;
}
