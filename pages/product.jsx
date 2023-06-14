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
  const [productList, setProductList] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const fetchProducts = async () => {
    try {
      setProductList(null);
      const products = await fetchApi.get(`/product/list`, {
        params: {
          page: router.query.page,
          limit: 30,
          category: router.query.category,
          search: router.query.search,
        },
      });
      setProductList(products.data.data);
      setErrorMessage("");
    } catch (error) {
      setProductList(null);
      errorHanddler(error, setErrorMessage);
    }
  };

  const handlePagination = (page) => {
    router.push({
      pathname: "/product",
      query: { ...router.query, page },
    });
  };

  const handleSearch = (search) => {
    router.push({
      pathname: "/product",
      query: { ...router.query, search, page: 1 },
    });
  };

  useEffect(() => {
    if (router.isReady) {
      fetchProducts();
    }
  }, [router.query.category, router.query.page, router.query.search]);

  return (
    <>
      <div className="p-4 md:ml-64">
        <div className="pb-5">
          <SearchForm searchTextCallback={handleSearch} />
        </div>
        {productList && productList.list ? (
          <>
            <div className="grid grid-cols-3 lg:grid-cols-5 gap-5">
              {productList.list.map((product) => (
                <ProductDisplayContainer key={product._id} product={product} />
              ))}
            </div>
            <div className="flex justify-center pt-5">
              <Pagination data={productList} onPageChange={handlePagination} />
            </div>
          </>
        ) : (
          <div className="h-[70vh] flex justify-center items-center">
            {errorMessage ? (
              <div className="text-[#FF0000] font-semibold mb-2">
                {errorMessage}
              </div>
            ) : (
              <LoadingAnimation />
            )}
          </div>
        )}
      </div>
    </>
  );
};

Product.getLayout = navbarFooterSidebarLayot;

export default Product;
