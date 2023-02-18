import { Kindle, KindleBookDetails } from "kindle-api";
import { setTimeout } from "node:timers/promises";
import { today, withCache } from "./persistence";

const kindle = await Kindle.fromConfig({
	cookies: import.meta.env.KINDLE_COOKIES,
	deviceToken: import.meta.env.KINDLE_DEVICE_TOKEN,
});

export const getBooks = withCache(`books-${today()}.json`, async () => {
	let data: KindleBookDetails[] = [];
	console.log("Fetching kindle books");
	for (const book of kindle.defaultBooks.slice(0, 10)) {
		const details = await book.details();
		if (details.progress.position === -1) {
			console.log(`Not adding ${details.title}`);
			continue;
		}
		const fullDetails = await book.fullDetails(details);

		console.log(`Fetched book ${details.title}`);
		// add a delay after each book lookup to not spam and get banned
		await setTimeout(300);
		data.push(fullDetails);
	}
	console.log("Finished fetching kindle books");
	return data;
});