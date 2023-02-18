import getReadingTime from "reading-time";
import { toString as mdAstToString } from "mdast-util-to-string";

export function astReadingTime(md) {
  const textOnPage = mdAstToString(md, { includeImageAlt: false });
  return getReadingTime(textOnPage);
}

export function remarkReadingTime() {
  return function (tree, ctx) {
    const { data } = ctx;
    const readingTime = astReadingTime(tree)
    // readingTime.text will give us minutes read as a friendly string,
    // i.e. "3 min read"
    data.astro.frontmatter.minutesRead = readingTime.text;
  };
}


