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

const Order = () => {
  const [orderList, setOrderList] = useState();
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const fetchData = async () => {
    try {
      setOrderList(null);
      const cookie = await getLoginCookie("user");
      if (!cookie) router.push("/");
      const order = await fetchApi.get(
        `/order/list?page=${router.query.page}&limit=10${
          router.query.search ? `&search=${router.query.search}` : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );
      setOrderList(order.data.data);
      setErrorMessage("");
    } catch (error) {
      errorHanddler(error, setErrorMessage);
    }
  };
  useEffect(() => {
    if (router.isReady) {
      fetchData();
    }
  }, [router.query.category, router.query.page, router.query.search]);

  const handdlePagination = (page) => {
    router.push({
      query: { ...router.query, page: page },
    });
  };

  const handdleSearch = (search) => {
    router.push({
      query: { ...router.query, search: search, page: 1 },
    });
  };

  const handdleFilter = (event) => {
    event.preventDefault();
    console.log(event);
  };

  return (
    <>
      <div className="flex justify-center pt-5">
        <div className="w-[90%] md:w-[80%] max-w-[1400px] flex flex-col gap-4">
          <div className="flex w-full justify-between gap-5">
            <button
              onClick={() => setShowModal(true)}
              className={
                "bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white rounded-lg focus:outline-none focus:shadow-outline-gray"
              }
            >
              Filter
            </button>
            <div className="md:w-[40%]">
              <SearchForm searchTextCallback={handdleSearch} />
            </div>
          </div>
          {orderList ? (
            <>
              {orderList.list.map((order) => (
                <OrderDisplay order={order} key={order._id} />
              ))}
            </>
          ) : (
            <>
              <div className="h-[70vh] flex justify-center items-center">
                {errorMessage ? (
                  <div className="text-[#FF0000] font-semibold mb-2">
                    {errorMessage}
                  </div>
                ) : (
                  <LoadingAnimation />
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="w-full flex justify-center pt-10">
        <Pagination data={orderList} onPageChange={handdlePagination} />
      </div>
      {showModal && (
        <Modal title={"Filter"} onDecline={() => setShowModal(false)}>
          <form onSubmit={handdleFilter}>
            <div className="grid grid-cols-2 gap-5">
              <InputDate name={"Start From"} />
              <InputDate name={"Start From"} />
            </div>
            <ModalFormButton
              onDecline={() => setShowModal(false)}
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
