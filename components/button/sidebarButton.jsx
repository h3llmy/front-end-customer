import Link from "next/link";
import { useRouter } from "next/router";

const SidebarButton = ({ href, svg, name, notif, onClick, query, id }) => {
  const router = useRouter();
  return (
    <Link href={href}>
      <a
        onClick={onClick}
        className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 ${
          router.query[query] === id
            ? "bg-gray-200 dark:bg-gray-700 border-2 border-gray-400"
            : ""
        }`}
      >
        {svg}
        <p className="flex-1 ml-3 text-[rgb(136 19 55)]">{name}</p>
        {notif ? (
          <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
            {notif}
          </span>
        ) : null}
      </a>
    </Link>
  );
};

export default SidebarButton;
