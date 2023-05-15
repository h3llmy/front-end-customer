import NavbarMenuButton from "./navbarMenuButton";

const NavbarMenu = ({ menuDisplay }) => {
  return (
    <div
      className={`${
        menuDisplay ? "" : "hidden"
      } absolute right-3 top-14 z-50 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
    >
      <ul className="py-2 w-36" aria-labelledby="user-menu-button">
        <li>
          <NavbarMenuButton href={"/collection"} label={"Collection"} />
        </li>
        <li>
          <NavbarMenuButton href={"/order"} label={"Order"} />
        </li>
        <li>
          <NavbarMenuButton href={"/"} label={"Sign out"} />
        </li>
      </ul>
    </div>
  );
};

export default NavbarMenu;
