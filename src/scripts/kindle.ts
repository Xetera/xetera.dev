import { Kindle, KindleBookDetails } from "kindle-api";
import { setTimeout } from "node:timers/promises";
import { today, withCache } from "./persistence";

let kindle: Kindle | undefined;

export const getBooks = withCache(`books-${today()}.json`, async () => {
  kindle ??= await Kindle.fromConfig({
    cookies: import.meta.env.KINDLE_COOKIES,
    deviceToken: import.meta.env.KINDLE_DEVICE_TOKEN,
  })
  let data: KindleBookDetails[] = [];
  console.log("Fetching kindle books");

  const books = kindle.defaultBooks.slice(
    0,
    import.meta.env.KINDLE_MAX_BOOKS_FETCH ?? 10,
  )

  for (const book of books) {
    const details = await book.details();
    if (details.progress.position === -1) {
      console.log(`Not adding ${details.title}`);
      continue;
    }
    const fullDetails = await book.fullDetails(details);

    console.log(`Fetched book ${details.title}`);
    // add a delay after each book lookup to not spam and get banned
    await setTimeout(100);
    data.push(fullDetails);
  }
  console.log("Finished fetching kindle books");
  return data;
});
