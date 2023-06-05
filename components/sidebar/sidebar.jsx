import { useEffect, useState } from "react";
import SidebarButton from "../button/sidebarButton";
import { fetchApi } from "../../utils/fetch";
import errorHanddler from "../../utils/errorHanddler";
import LoadingAnimation from "../loading/loadingAnimation";

const Sidebar = () => {
  const [categoriesList, setCategoriesList] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(false); // State to track sidebar visibility

  const fetchData = async () => {
    try {
      const response = await fetchApi.get("/categories/list");
      setCategoriesList(response.data.data);
      setErrorMessage("");
    } catch (error) {
      errorHanddler(error, setErrorMessage);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleSidebar}
        className="absolute top-0 md:hidden right-0 p-2 m-4 bg-gray-200 rounded-md z-50"
      >
        {sidebarVisible ? "Hide" : "Show"}
      </button>
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          sidebarVisible
            ? "-translate-x-0"
            : "-translate-x-full md:-translate-x-0"
        } bg-white border-r border-gray-500 dark:bg-gray-800 dark:border-gray-700`}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto">
          <h1 className="font-bold pb-3 text-lg">Category</h1>
          <ul className="space-y-2 font-medium">
            {categoriesList?.list ? (
              <>
                <li>
                  <SidebarButton
                    query={"category"}
                    href={`/product?page=1`}
                    name={"all"}
                  />
                </li>
                {categoriesList.list.map((category) => (
                  <li key={category._id}>
                    <SidebarButton
                      query={"category"}
                      id={category._id}
                      href={`/product?category=${category._id}&page=1`}
                      name={category.name}
                    />
                  </li>
                ))}
              </>
            ) : (
              <>
                {errorMessage ? (
                  <div className="text-[#FF0000] font-semibold mb-2">
                    {errorMessage}
                  </div>
                ) : (
                  <LoadingAnimation />
                )}
              </>
            )}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
