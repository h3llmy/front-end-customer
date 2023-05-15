import Link from "next/link";

const NavbarMenuButton = ({ label, href, onClick }) => {
  return (
    <Link href={href}>
      <a
        onClick={onClick}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
      >
        {label}
      </a>
    </Link>
  );
};

export default NavbarMenuButton;
