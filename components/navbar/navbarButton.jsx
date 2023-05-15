import Link from "next/link";
import { useRouter } from "next/router";

const NavbarButton = ({ href, name, onClick }) => {
  const router = useRouter();

  return (
    <Link href={href}>
      <a
        onClick={onClick}
        className={`block py-2 pl-3 pr-4 md:bg-transparent rounded ${
          router.pathname === href
            ? "text-white bg-blue-700 md:text-blue-700 md:p-0 md:dark:text-blue-500"
            : "text-gray-900 hover:bg-gray-100 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
        } `}
      >
        {name}
      </a>
    </Link>
  );
};

export default NavbarButton;
