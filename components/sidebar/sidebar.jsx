import { useEffect, useState } from "react";
import SidebarButton from "../button/sidebarButton";
import { fetchApi } from "../../utils/fetch";
import errorHanddler from "../../utils/errorHanddler";
import LoadingAnimation from "../loading/loadingAnimation";

const Sidebar = () => {
  const [categoriesList, setCategoriesList] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetchApi.get("/categories/list");
      setCategoriesList(response.data.data);
      setErrorMessage(false);
    } catch (error) {
      errorHanddler(error, setErrorMessage);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-0 bg-white border-r border-gray-500 dark:bg-gray-800 dark:border-gray-700">
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
  );
};

export default Sidebar;
