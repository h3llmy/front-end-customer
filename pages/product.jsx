import { useEffect, useState } from "react";
import { fetchApi } from "../utils/fetch";
import { useRouter } from "next/router";
import errorHanddler from "../utils/errorHanddler";
import LoadingAnimation from "../components/loading/loadingAnimation";
import ProductDisplayContainer from "../components/conteiner/productDisplay";
import Pagination from "../components/pagination/pagination";
import SearchForm from "../components/form/searchForm";
import { navbarFooterSidebarLayot } from "../components/layout/navbarFooterSidebarLayout";

const Product = () => {
  const [productList, setProductList] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const fetch = async () => {
    try {
      setProductList(null);
      const products = await fetchApi.get(
        `/product/list?page=${router.query.page}&limit=30${
          router.query.category ? `&category=${router.query.category}` : ""
        }${router.query.search ? `&search=${router.query.search}` : ""}`
      );
      setProductList(products.data.data);
      setErrorMessage("");
    } catch (error) {
      setProductList(null);
      errorHanddler(error, setErrorMessage);
    }
  };

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

  useEffect(() => {
    if (router.isReady) {
      fetch();
    }
  }, [router.query.category, router.query.page, router.query.search]);

  return (
    <>
      <div className="p-4 md:ml-64">
        <div className="pb-5">
          <SearchForm searchTextCallback={handdleSearch} />
        </div>
        {productList?.list ? (
          <>
            <div className="grid grid-cols-3 lg:grid-cols-5 gap-5">
              {productList.list.map((product) => (
                <ProductDisplayContainer key={product._id} product={product} />
              ))}
            </div>
            <div className="flex justify-center pt-5">
              <Pagination data={productList} onPageChange={handdlePagination} />
            </div>
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
    </>
  );
};

Product.getLayout = navbarFooterSidebarLayot;

export default Product;
