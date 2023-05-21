import { deleteCookie } from "../../utils/cookie";
import NavbarMenuButton from "./navbarMenuButton";

const NavbarMenu = ({ menuDisplay }) => {
  const handdleLogout = () => {
    deleteCookie("user");
  };
  return (
    <div
      className={`${
        menuDisplay ? "" : "hidden"
      } absolute right-3 top-14 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
    >
      <ul className="py-2 w-36" aria-labelledby="user-menu-button">
        <li>
          <NavbarMenuButton href={"/collection"} label={"Collection"} />
        </li>
        <li>
          <NavbarMenuButton href={"/order"} label={"Order"} />
        </li>
        <li>
          <NavbarMenuButton
            onClick={handdleLogout}
            href={"/login"}
            label={"Sign out"}
          />
        </li>
      </ul>
    </div>
  );
};

export default NavbarMenu;
