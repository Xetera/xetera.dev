import Link from "next/link";
import { useRouter } from "next/router";
import { SITE_NAME } from "./data";
import { FaHandPointLeft } from "react-icons/fa";

const title = `${SITE_NAME}'s Den`;
const classes = "font-white no-underline";

export function Hr() {
  return <hr style={{ background: "#293a4a" }} />;
}

export default function Layout({ children }) {
  const { pathname } = useRouter();
  const isRoot = pathname === "/";

  const header = isRoot ? (
    <h1 className="mb-4 md:mb-6">
      <Link href="/">
        <a className={`xl:text-6xl text-4xl ${classes} text-gray-200 `}>
          {title}
        </a>
      </Link>
    </h1>
  ) : (
    <Link href="/">
      <h1 className="mb-4 flex items-center cursor-pointer">
        <FaHandPointLeft
          size="30px"
          className="text-gray-400 mr-4 pointer mb-1"
        />
        <a className={`md:text-2xl text-xl ${classes} text-gray-400`}>
          {title}
        </a>
      </h1>
    </Link>
  );

  return (
    <div
      className="max-w-screen-sm px-4 xl:py-8 lg:py-4 py-0 mx-auto"
      style={{ maxWidth: !isRoot && "42rem" }}
    >
      <header>{header}</header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with{" "}
        <a href="https://nextjs.org/">Next.js</a> &#128293;
      </footer>
    </div>
  );
}
