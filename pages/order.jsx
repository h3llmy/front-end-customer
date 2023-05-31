import { useEffect, useState } from "react";
import { getLayout } from "../components/layout/layout";
import errorHanddler from "../utils/errorHanddler";
import { fetchApi } from "../utils/fetch";
import { getLoginCookie } from "../utils/cookie";

const Order = () => {
  const [orderList, setOrderList] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const fetchData = async () => {
    try {
      const cookie = await getLoginCookie("user");
      const order = await fetchApi.get("/order/list", {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      });
      setOrderList(order.data.data);
      setErrorMessage("");
    } catch (error) {
      errorHanddler(error, setErrorMessage);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(orderList);
  return (
    <div>
      <p>order</p>
    </div>
  );
};

Order.getLayout = getLayout;

export default Order;
