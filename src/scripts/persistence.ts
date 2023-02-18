import { mkdir, writeFile, readFile } from "node:fs/promises";
import { endOfToday } from "date-fns";
import { pathToFileURL } from "node:url";
import { writeFileSync } from "node:fs";

const fetching = new Map<string, Promise<unknown>>();

export function today(): string {
	return endOfToday().toISOString();
}

export function withCache<T>(key: string, fetcher: () => Promise<T>) {
	return async (): Promise<T> => {
		try {
			await mkdir(".astro/cache", { recursive: true });
			const file = await readFile(`.astro/cache/${key}`, "utf-8");
			console.info(`[cache] Using cached data for ${key}`);
			return JSON.parse(file) as T;
		} catch (err) {
			const promise = fetching.get(key);
			if (promise) {
				return promise as T;
			}
			console.info(`[cache] Running fetcher for ${key}`);
			const prom = new Promise<T>((res, rej) => {
				fetcher()
					.then((results) => {
						writeFileSync(
							pathToFileURL(`.astro/cache/${key}`).pathname,
							new Uint8Array(Buffer.from(JSON.stringify(results, null, 2))),
							{ flag: "w" },
						);
						return results;
					})
					.then(res, rej)
					.finally(() => {
						fetching.delete(key);
					});
			});
			fetching.set(key, prom);
			return prom;
		}
	};
}
