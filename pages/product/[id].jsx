import { useRouter } from "next/router";
import errorHanddler from "../../utils/errorHanddler";
import { useEffect, useState } from "react";
import { fetchApi } from "../../utils/fetch";
import Modal from "../../components/modal/modal";
import SelectDiscountForm from "../../components/form/selectDiscountForm";
import ProductDetail from "../../components/conteiner/productDetail";
import StickyWhatsappLogo from "../../components/conteiner/stickyWhatappLogo";
import OrderContainer from "../../components/conteiner/orderContainer";
import { navbarFooterLayot } from "../../components/layout/navbarFooterLayout";

const Detail = () => {
  const router = useRouter();
  const [productDetail, setProductDetail] = useState({});
  const [discount, setDiscount] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetch = async () => {
    try {
      const productFind = await fetchApi.get(
        `/product/detail/${router.query.id}`
      );
      setProductDetail(productFind.data.data);
    } catch (error) {
      errorHanddler(error, setErrorMessage);
    }
  };

  const fetchDiscount = async () => {
    try {
      const discountFind = await fetchApi.get(
        `/discount/select/${router.query.id}`
      );
      setDiscount(discountFind.data.data);
    } catch (error) {
      errorHanddler(error, setErrorMessage);
    }
  };

  const handdleDisplayModal = () => {
    setShowModal(showModal ? false : true);
  };

  useEffect(() => {
    if (router.isReady) {
      fetch();
    }
  }, [router.query.id]);

  useEffect(() => {
    if (Object.keys(productDetail).length > 0) {
      fetchDiscount();
    }
  }, [productDetail]);

  return (
    <>
      {errorMessage.includes("Product") || errorMessage == "_id" ? (
        <div className="text-[#FF0000] font-semibold mb-2 flex justify-center items-center h-screen">
          product not found
        </div>
      ) : (
        <>
          <div className="p-5">
            <p className="w-full flex justify-center font-medium text-3xl pb-5">
              {productDetail?.name}
            </p>
            <div className="w-full lg:flex lg:space-x-5">
              <div className="lg:w-3/4 p-5 border-2 border-gray-300 rounded-lg">
                <ProductDetail defaultValue={productDetail?.productUrl} />
                <h1 className="w-full flex justify-center font-medium text-2xl py-5">
                  Product Description
                </h1>
                <div className="overflow-x-auto">
                  <pre className="whitespace-pre-wrap font-mono font-medium">
                    {productDetail?.descryption}
                  </pre>
                </div>
              </div>
              <div className="lg:w-1/4 mt-5 lg:mt-0 h-full border-2 border-gray-300 rounded-lg p-3 shadow-md">
                <OrderContainer
                  title={"Order"}
                  productDetail={productDetail}
                  discount={discount}
                  onClick={handdleDisplayModal}
                  displayButton={true}
                />
              </div>
            </div>
          </div>
          <StickyWhatsappLogo />
          {showModal && (
            <Modal onDecline={handdleDisplayModal} title={"Create Order"}>
              <SelectDiscountForm
                productId={productDetail?._id}
                discountId={discount?._id}
              >
                <OrderContainer
                  title={"Order Detail"}
                  productDetail={productDetail}
                  discount={discount}
                  onClick={handdleDisplayModal}
                />
              </SelectDiscountForm>
            </Modal>
          )}
        </>
      )}
    </>
  );
};

Detail.getLayout = navbarFooterLayot;

export default Detail;
