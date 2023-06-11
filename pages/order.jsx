import { useEffect, useState } from "react";
import errorHanddler from "../utils/errorHanddler";
import { fetchApi } from "../utils/fetch";
import { getLoginCookie } from "../utils/cookie";
import OrderDisplay from "../components/conteiner/orderDisplay";
import { useRouter } from "next/router";
import Pagination from "../components/pagination/pagination";
import LoadingAnimation from "../components/loading/loadingAnimation";
import SearchForm from "../components/form/searchForm";
import { navbarFooterLayot } from "../components/layout/navbarFooterLayout";
import Modal from "../components/modal/modal";
import InputDate from "../components/input/inputDate";
import ModalFormButton from "../components/button/modalFormButton";
import OrderForm from "../components/form/orderForm";

const Order = () => {
  const [orderList, setOrderList] = useState(null);
  const [orderDetail, setOrderDetail] = useState(null);
  const [filterStart, setFilterStart] = useState(null);
  const [filterUntil, setFilterUntil] = useState(null);
  const [showModalFilter, setShowModalFilter] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const fetchOrderDetail = async (orderId) => {
    try {
      setOrderDetail(null);
      const cookie = await getLoginCookie("user");
      if (!cookie) router.push("/");
      const orderDetail = await fetchApi.get(`/order/detail/${orderId}`, {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      });
      setOrderDetail(orderDetail.data.data);
    } catch (error) {
      errorHanddler(error, setErrorMessage);
      setOrderDetail(null);
    }
  };

  const fetchOrderList = async () => {
    try {
      setOrderList(null);
      const cookie = await getLoginCookie("user");
      if (!cookie) router.push("/");
      const order = await fetchApi.get(`/order/list`, {
        params: {
          page: router.query.page,
          limit: 10,
          search: router.query.search,
          datefrom: router.query.datefrom,
          dateuntil: router.query.dateuntil,
        },
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
    if (router.isReady) {
      fetchOrderList();
    }
  }, [
    router.query.category,
    router.query.page,
    router.query.search,
    router.query.datefrom,
    router.query.dateuntil,
  ]);

  const handlePagination = (page) => {
    router.push({
      query: { ...router.query, page: page },
    });
  };

  const handleSearch = (search) => {
    router.push({
      query: { ...router.query, search: search, page: 1 },
    });
  };

  const handleFilter = (event) => {
    event.preventDefault();
    router.push({
      query: { ...router.query, datefrom: filterStart, dateuntil: filterUntil },
    });
    setShowModalFilter(false);
  };

  const handleDetail = (orderId) => {
    fetchOrderDetail(orderId);
    setShowModalDetail(true);
  };

  return (
    <>
      <div className="flex justify-center pt-5">
        <div className="w-[90%] md:w-[80%] max-w-[1400px] flex flex-col gap-4">
          <div className="flex w-full justify-between gap-5">
            <button
              onClick={() => setShowModalFilter(true)}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white rounded-lg focus:outline-none focus:shadow-outline-gray"
            >
              Filter
            </button>
            <div className="md:w-[40%]">
              <SearchForm searchTextCallback={handleSearch} />
            </div>
          </div>
          {orderList ? (
            <>
              {orderList.list.map((order) => (
                <a
                  className="text-left"
                  onClick={() => handleDetail(order._id)}
                  key={order._id}
                >
                  <OrderDisplay order={order} />
                </a>
              ))}
            </>
          ) : (
            <>
              <div className="h-[70vh] flex justify-center items-center">
                {errorMessage ? (
                  <div className="text-[#FF0000] font-semibold mb-2">
                    {(typeof errorMessage === "string" && errorMessage) ||
                      "order not found"}
                  </div>
                ) : (
                  <LoadingAnimation />
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="w-full flex justify-center py-10">
        <Pagination data={orderList} onPageChange={handlePagination} />
      </div>
      {showModalDetail && (
        <Modal
          title={"Order Detail"}
          onDecline={() => setShowModalDetail(false)}
        >
          {orderDetail ? (
            <>
              <OrderForm
                orderDetail={orderDetail}
                onDecline={() => setShowModalDetail(false)}
              />
            </>
          ) : (
            <LoadingAnimation />
          )}
        </Modal>
      )}
      {showModalFilter && (
        <Modal title={"Filter"} onDecline={() => setShowModalFilter(false)}>
          <form onSubmit={handleFilter}>
            <div className="grid grid-cols-2 gap-5">
              <InputDate
                name={"Start"}
                defaultValue={filterStart}
                inputValue={setFilterStart}
              />
              <InputDate
                name={"Until"}
                defaultValue={filterUntil}
                inputValue={setFilterUntil}
              />
            </div>
            <ModalFormButton
              onDecline={() => setShowModalFilter(false)}
              buttonName={"Find"}
              color={"bg-blue-700 hover:bg-blue-500"}
            />
          </form>
        </Modal>
      )}
    </>
  );
};

Order.getLayout = navbarFooterLayot;

export default Order;
