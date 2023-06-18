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
import InputTextArea from "../components/input/inputTextArea";

const Order = () => {
  const [orderList, setOrderList] = useState(null);
  const [orderDetail, setOrderDetail] = useState(null);
  const [filterStart, setFilterStart] = useState(null);
  const [filterUntil, setFilterUntil] = useState(null);
  const [revisionNote, setRevisionNote] = useState(null);
  const [showModalFilter, setShowModalFilter] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [showRevisionForm, setShowRevisionForm] = useState(false);
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

  useEffect(() => {
    orderDetail ? setShowRevisionForm(false) : setShowRevisionForm(false);
  }, [orderDetail]);

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

  const handdleAccept = async () => {
    try {
      await fetchOrderList();
      const cookie = await getLoginCookie("user");
      await fetchApi.put(
        `/order/update/accept/${orderDetail._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );
      setShowModalDetail(false);
    } catch (error) {
      errorHanddler(error, setErrorMessage);
    }
  };

  const postRevision = async () => {
    try {
      const cookie = await getLoginCookie("user");
      await fetchApi.put(
        `/order/update/revision/${orderDetail._id}`,
        { revisionNote: revisionNote },
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );
      fetchOrderList();
      alert("revision sended");
      setShowModalDetail(false);
    } catch (error) {
      errorHanddler(error, setErrorMessage);
    }
  };

  const handdleRevision = async () => {
    if (showRevisionForm) {
      await fetchOrderList();
      await postRevision();
    } else {
      setShowRevisionForm(true);
    }
  };

  return (
    <>
      <div className="flex justify-center pt-5">
        <div className="w-[90%] md:w-[80%] max-w-[1400px] flex flex-col gap-4">
          <h1 className="w-full text-center font-bold text-3xl">Order List</h1>
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
              {showRevisionForm ? (
                <InputTextArea
                  name={"Revision Note"}
                  autoFocus={true}
                  onError={
                    errorMessage?.revisionNote ||
                    (typeof errorMessage === "string" && errorMessage)
                  }
                  inputValue={setRevisionNote}
                />
              ) : (
                <OrderForm orderDetail={orderDetail} />
              )}
              <div className="px-6 py-4 flex justify-end space-x-3 items-center">
                {Number(orderDetail.maxRevision) -
                  Number(orderDetail.totalRevision) >
                  0 &&
                  orderDetail.orderStatus === "sended" && (
                    <>
                      <button
                        type="button"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:shadow-outline-gray"
                        onClick={handdleAccept}
                      >
                        Accept
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:shadow-outline-gray"
                        onClick={handdleRevision}
                      >
                        revision
                      </button>
                    </>
                  )}
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:shadow-outline-gray"
                  onClick={() => setShowModalDetail(false)}
                >
                  Cancel
                </button>
              </div>
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
