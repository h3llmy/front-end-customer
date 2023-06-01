import Link from "next/link";

const NavbarLogo = () => {
  return (
    <Link href={"/test"}>
      <a className="flex items-center">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="h-8 mr-3"
          alt="SAI Logo"
        />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          SAI
        </span>
      </a>
    </Link>
  );
};
export default NavbarLogo;
