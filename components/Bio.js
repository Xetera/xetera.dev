import Image, { TechImage } from "./Image";
import ExternalLink from "./ExternalLink";
import { getSiteMetaData } from "utils/helpers";

export default function Bio() {
  const { author, social } = getSiteMetaData();

  return (
    <>
      <div className="flex items-center my-8">
        <Image
          className="flex-shrink-0 w-12 h-12 mb-0 mr-4 rounded-full"
          src={require("../content/assets/avatar.png")}
          previewSrc={require("../content/assets/avatar.png?lqip")}
          alt="Profile"
        />
        <p className="mb-0 text-md text-gray-400">
          Hi, I'm a full-stack developer. Working on products that people love
          using gets me up in the morning.
        </p>
      </div>
      <div className="mb-6">
        <div
          className="grid gap-5 grid-flow-col"
          style={{ width: "max-content" }}
        >
          <ExternalLink
            href="https://github.com/xetera"
            className="flex items-center text-sm"
          >
            <TechImage name="github.png" alt="github" className="mr-2 mb-0" />{" "}
            Github
          </ExternalLink>
          <ExternalLink
            href="https://twitter.com/_Xetera"
            className="flex items-center text-sm"
          >
            <TechImage name="twitter.png" alt="twitter" className="mr-2 mb-0" />{" "}
            Twitter
          </ExternalLink>
        </div>
      </div>
    </>
  );
}
