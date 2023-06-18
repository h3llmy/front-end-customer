import { useEffect, useState } from "react";
import { navbarFooterLayot } from "../components/layout/navbarFooterLayout";
import errorHanddler from "../utils/errorHanddler";
import { fetchApi } from "../utils/fetch";
import { getLoginCookie } from "../utils/cookie";
import CollectionsDisplayContainer from "../components/conteiner/collectionsDisplayContainer";
import LoadingAnimation from "../components/loading/loadingAnimation";
import Pagination from "../components/pagination/pagination";
import { useRouter } from "next/router";
import SearchForm from "../components/form/searchForm";
import Modal from "../components/modal/modal";
import ProductDetail from "../components/conteiner/productDetail";
import InputText from "../components/input/inputText";
import ModalFormButton from "../components/button/modalFormButton";

const Collection = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [userCollections, setUserCollections] = useState(null);
  const [collectionsDetail, setCollectionsDetail] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const fetchCollection = async () => {
    try {
      setUserCollections(null);
      const cookie = await getLoginCookie("user");
      if (!cookie) router.push("/");
      const user = await fetchApi.get("/user/collections", {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
        params: {
          search: router.query.search,
          page: router.query.page,
          limit: 30,
        },
      });
      setUserCollections(user.data.data);
      setErrorMessage("");
    } catch (error) {
      errorHanddler(error, setErrorMessage);
    }
  };

  const handlePagination = (page) => {
    router.push({
      pathname: "/collection",
      query: { ...router.query, page },
    });
  };

  const handleSearch = (search) => {
    router.push({
      pathname: "/collection",
      query: { ...router.query, search, page: 1 },
    });
  };

  const handdleDetail = (collection) => {
    setCollectionsDetail(collection);
    setShowModal(true);
  };

  useEffect(() => {
    if (router.isReady) {
      fetchCollection();
    }
  }, [router.query.page, router.query.search]);

  return (
    <>
      <div className="p-4">
        <h1 className="w-full pb-4 text-center font-bold text-3xl">
          Collections
        </h1>
        <div className="pb-5">
          <SearchForm searchTextCallback={handleSearch} />
        </div>
        {userCollections?.list?.length > 0 && !errorMessage ? (
          <>
            <div className="grid grid-cols-3 lg:grid-cols-5 gap-5">
              {userCollections?.list.map((collection) => (
                <button
                  key={collection._id}
                  onClick={() => handdleDetail(collection)}
                >
                  <CollectionsDisplayContainer collection={collection} />
                </button>
              ))}
            </div>
            <div className="flex justify-center pt-5">
              <Pagination
                data={userCollections}
                onPageChange={handlePagination}
              />
            </div>
          </>
        ) : (
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
        )}
      </div>
      {showModal && (
        <>
          <Modal title={"Collection"} onDecline={() => setShowModal(false)}>
            <div className="grid grid-cols-2 gap-5">
              <InputText
                name={"Name"}
                defaultValue={collectionsDetail.productName}
                inputValue={() => {}}
                disable={true}
              />
              <InputText
                name={"Category"}
                defaultValue={collectionsDetail.productCategory}
                inputValue={() => {}}
                disable={true}
              />
            </div>
            <div className="pt-5">
              <ProductDetail
                downloadAble={true}
                defaultValue={[collectionsDetail.productUrl]}
              />
            </div>
            <ModalFormButton onDecline={() => setShowModal(false)} />
          </Modal>
        </>
      )}
    </>
  );
};

Collection.getLayout = navbarFooterLayot;

export default Collection;
