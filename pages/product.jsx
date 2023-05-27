import { useEffect, useState } from "react";
import { getLayout } from "../components/layout/layout";
import Sidebar from "../components/sidebar/sidebar";
import { fetchApi } from "../utils/fetch";
import { useRouter } from "next/router";
import errorHanddler from "../utils/errorHanddler";
import LoadingAnimation from "../components/loading/loadingAnimation";
import ProductDisplayContainer from "../components/conteiner/productDisplay";
import Pagination from "../components/pagination/pagination";

const Product = () => {
  const [productList, setProductList] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const fetch = async () => {
    try {
      const products = await fetchApi.get(
        `/product/list?page=${router.query.page}&limit=20${
          router.query.category ? `&category=${router.query.category}` : ""
        }`
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

  useEffect(() => {
    if (router.isReady) {
      fetch();
    }
  }, [router.query.category, router.query.page]);

  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        {productList?.list ? (
          <>
            <div className="grid grid-cols-5 gap-5">
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
            {errorMessage ? (
              <div className="text-[#FF0000] font-semibold mb-2">
                {errorMessage}
              </div>
            ) : (
              <LoadingAnimation />
            )}
          </>
        )}
      </div>
    </>
  );
};

Product.getLayout = getLayout;

export default Product;
