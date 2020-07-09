import Image, { TechImageSmall } from "./Image";
import ExternalLink from "./ExternalLink";
import { getSiteMetaData } from "utils/helpers";

export default function Bio() {
  const { author, social } = getSiteMetaData();

  return (
    <>
      <div className="flex sm:items-center mt-8 mb-6 sm:flex-row flex-col items-start">
        <Image
          className="flex-shrink-0 w-12 h-12 mb-4 sm:mb-0 mr-4 rounded-full"
          src={require("../content/assets/avatar.png?resize&size=100&quality=100")}
          alt="Profile"
        />
        <p className="mb-0 text-md text-gray-400">
          Hi, I'm a full-stack developer. Working on products that people love
          using gets me up in the morning. Currently building{" "}
          <ExternalLink href="https://dev.kiyomi.io">kiyomi.io</ExternalLink>
        </p>
      </div>
      <div className="mb-8">
        <div
          className="grid gap-5 grid-flow-col"
          style={{ width: "max-content" }}
        >
          <ExternalLink
            href="https://github.com/xetera"
            className="flex items-center text-sm"
          >
            <TechImageSmall
              name="github.png"
              alt="github"
              className="mr-3 mb-0"
            />{" "}
            Github
          </ExternalLink>
          <ExternalLink
            href="https://twitter.com/_Xetera"
            className="flex items-center text-sm"
          >
            <TechImageSmall
              name="twitter.png"
              alt="twitter"
              className="mr-3 mb-0"
            />{" "}
            Twitter
          </ExternalLink>
        </div>
      </div>
    </>
  );
}
