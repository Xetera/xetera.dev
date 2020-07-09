import Link from "next/link";
import { useRouter } from "next/router";
import { SITE_NAME } from "./data";
import { FaHandPointLeft } from "react-icons/fa";

const title = `${SITE_NAME}'s Den`;
const classes = "font-white no-underline";

export default function Layout({ children }) {
  const { pathname } = useRouter();
  const isRoot = pathname === "/";

  const header = isRoot ? (
    <h1 className="mb-6">
      <Link href="/">
        <a className={`text-6xl ${classes} text-gray-200 `}>{title}</a>
      </Link>
    </h1>
  ) : (
    <Link href="/">
      <h1 className="mb-2 flex items-baseline cursor-pointer">
        <FaHandPointLeft size="35px" className="text-gray-500 mr-4 pointer" />
        <a className={`text-2xl ${classes} text-gray-500`}>{title}</a>
      </h1>
    </Link>
  );

  return (
    <div className="max-w-screen-sm px-4 xl:py-8 py-4 mx-auto">
      <header>{header}</header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with{" "}
        <a href="https://nextjs.org/">Next.js</a> &#128293;
      </footer>
    </div>
  );
}
