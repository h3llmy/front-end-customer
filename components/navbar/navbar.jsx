import { useState } from "react";
import NavbarButton from "./navbarButton";
import NavbarLogo from "./navbarLogo";
import NavbarMenu from "./navbarMenu";

const Navbar = () => {
  const [menuDisplay, setMenuDisplay] = useState(false);

  const handdleMenuDisplay = (event) => {
    event.preventDefault();
    setTimeout(() => {
      menuDisplay ? setMenuDisplay(false) : setMenuDisplay(true);
    }, 100);
  };

  return (
    <>
      <nav className="fixed w-full bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <NavbarLogo />
          <div className="flex items-center md:order-2">
            <button
              className="flex p-1 hidden md:block mr-3 text-sm md:mr-0 text-white"
              onFocus={handdleMenuDisplay}
              onClick={handdleMenuDisplay}
              onBlur={handdleMenuDisplay}
            >
              Mina
            </button>
            <div className="hidden md:block">
              <NavbarMenu menuDisplay={menuDisplay} />
            </div>
            <button
              onFocus={handdleMenuDisplay}
              onClick={handdleMenuDisplay}
              onBlur={handdleMenuDisplay}
              type="button"
              className="inline-flex items-center p-1 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between ${
              menuDisplay ? "" : "hidden"
            } w-full md:flex md:w-auto md:order-1`}
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavbarButton href={"/"} name={"Home"} />
              </li>
              <li>
                <NavbarButton href={"/product"} name={"Product"} />
              </li>
              <li>
                <NavbarButton href={"/contact"} name={"Contact"} />
              </li>
              <li>
                <NavbarButton href={"/about"} name={"About"} />
              </li>
              <li className="md:hidden">
                <NavbarButton href={"/collection"} name={"Collection"} />
              </li>
              <li className="md:hidden">
                <NavbarButton href={"/order"} name={"Order"} />
              </li>
              <li className="md:hidden">
                <NavbarButton href={"/logout"} name={"Sign out"} />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
