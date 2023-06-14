import { useEffect, useState } from "react";
import NavbarButton from "./navbarButton";
import NavbarLogo from "./navbarLogo";
import NavbarMenu from "./navbarMenu";
import { deleteCookie, getLoginCookie } from "../../utils/cookie";
import { fetchApi } from "../../utils/fetch";
import Link from "next/link";

const Navbar = ({ setSidebarVisible, sidebarButton }) => {
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [sidebarDisplay, setSidebarDisplay] = useState(false);
  const [userLogin, setUserLogin] = useState("");

  const getUserLogin = async () => {
    try {
      const loginToken = await getLoginCookie("user");
      if (loginToken) {
        const getUserDetail = await fetchApi.get("/user/detail", {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        });
        setUserLogin(getUserDetail.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserLogin();
  }, []);

  const handdleMenuDisplay = (event) => {
    event.preventDefault();
    setTimeout(() => {
      menuDisplay ? setMenuDisplay(false) : setMenuDisplay(true);
    }, 100);
  };

  const handdleLogout = () => {
    deleteCookie("user");
  };

  const handdleSidebarVisible = () => {
    setSidebarDisplay(sidebarDisplay ? false : true);
  };

  const a = () => {
    setSidebarDisplay(false);
  };

  useEffect(() => {
    if (sidebarButton) {
      setSidebarVisible(sidebarDisplay);
    }
  }, [sidebarDisplay]);

  return (
    <>
      <nav className="fixed w-full bg-white border-gray-200 dark:bg-gray-800 z-[50] border-b-2 dark:border-black shadow-md">
        <div className="w-full flex flex-wrap items-center justify-between mx-auto p-4 px-10">
          <div className="flex flex-row gap-5">
            {sidebarButton && (
              <button
                type="button"
                onBlur={a}
                onClick={handdleSidebarVisible}
                className="md:hidden"
              >
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
            )}
            <NavbarLogo />
          </div>
          <div className="flex items-center md:order-2">
            {userLogin?.username ? (
              <button
                className="flex p-1 md:block mr-3 text-md md:mr-0 font-bold dark:text-white"
                onFocus={handdleMenuDisplay}
                onClick={handdleMenuDisplay}
                onBlur={() => {
                  setTimeout(() => {
                    setMenuDisplay(false);
                  }, 200);
                }}
              >
                {userLogin?.username}
              </button>
            ) : (
              <div className="md:flex space-x-4 hidden">
                <Link href={"/register"}>
                  <button className="flex p-1 font-bold md:block mr-3 text-sm md:mr-0 dark:text-white">
                    Register
                  </button>
                </Link>
                <Link href={"/login"}>
                  <button className="flex p-1 font-bold md:block mr-3 text-sm md:mr-0 dark:text-white">
                    Login
                  </button>
                </Link>
              </div>
            )}
            {userLogin && (
              <div className="hidden md:block">
                <NavbarMenu menuDisplay={menuDisplay} />
              </div>
            )}
            <button
              onFocus={handdleMenuDisplay}
              onClick={handdleMenuDisplay}
              onBlur={() => {
                setTimeout(() => {
                  setMenuDisplay(false);
                }, 100);
              }}
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
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-16 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-800 dark:border-gray-700">
              <li>
                <NavbarButton href={"/"} name={"Home"} />
              </li>
              <li>
                <NavbarButton href={"/product"} name={"Product"} />
              </li>
              <li>
                <NavbarButton href={"/about"} name={"About"} />
              </li>
              {userLogin ? (
                <div className="md:hidden">
                  <li>
                    <NavbarButton href={"/collection"} name={"Collection"} />
                  </li>
                  <li>
                    <NavbarButton href={"/order"} name={"Order"} />
                  </li>
                  <li>
                    <NavbarButton
                      onClick={handdleLogout}
                      href={"/login"}
                      name={"Sign out"}
                    />
                  </li>
                </div>
              ) : (
                <div className="md:hidden">
                  <NavbarButton href={"/login"} name={"Login"} />
                  <NavbarButton href={"/register"} name={"Register"} />
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
