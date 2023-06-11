import { useEffect, useState } from "react";
import { navbarFooterLayot } from "../components/layout/navbarFooterLayout";
import errorHanddler from "../utils/errorHanddler";
import { fetchApi } from "../utils/fetch";
import { getLoginCookie } from "../utils/cookie";

const Collection = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [userCollections, setUserCollections] = useState(null);
  const fetchCollection = async () => {
    try {
      const cookie = await getLoginCookie("user");
      const user = await fetchApi.get("/user/detail", {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      });
      setUserCollections(user.data.data.collections);
    } catch (error) {
      errorHanddler(error, setErrorMessage);
    }
  };

  useEffect(() => {
    fetchCollection();
  }, []);
  return (
    <div>
      <p>mantap</p>
    </div>
  );
};

Collection.getLayout = navbarFooterLayot;

export default Collection;
