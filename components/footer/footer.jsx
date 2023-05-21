import Link from "next/link";
import NavbarLogo from "../navbar/navbarLogo";

const Footer = () => {
  return (
    <footer className="bg-white shadow border-t-2 dark:border-black">
      <div className="w-full dark:bg-gray-800 p-4 px-10">
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <Link href={"/"}>
            <a className="hover:underline">Semua Aplikai Indonesia™</a>
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
