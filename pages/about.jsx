import { useEffect, useState } from "react";
import AboutContainer from "../components/conteiner/aboutContainer";
import { fetchApi } from "../utils/fetch";
import errorHanddler from "../utils/errorHanddler";
import ContactUsContainer from "../components/conteiner/contactUsContainer";
import getConfig from "next/config";
import { navbarFooterLayot } from "../components/layout/navbarFooterLayout";

const About = () => {
  const [totalUser, setTotalUser] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const { publicRuntimeConfig } = getConfig();

  const fetchData = async () => {
    try {
      const [users, orders, product, category] = await Promise.all([
        fetchApi.get("/user/total"),
        fetchApi.get("/order/total"),
        fetchApi.get("/product/total"),
        fetchApi.get("/categories/total"),
      ]);
      setTotalCategories(category.data.data);
      setTotalProduct(product.data.data);
      setTotalOrder(orders.data.data);
      setTotalUser(users.data.data);
    } catch (error) {
      errorHanddler(error, setErrorMessage);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="h-[40vh] md:h-[89vh] flex items-center justify-center">
        <div className="absolute flex text-5xl font-semibold text-white">
          <div className="text-4xl md:text-6xl text-white z-[20] text-stroke text-center">
            Tentang PT Semua Aplikasi Indonesia
          </div>
        </div>
        <img
          className="h-full w-full object-cover z-[10]"
          src={"blog-digital-transformation.jpg"}
          alt="about image"
        />
      </div>
      <AboutContainer />
      <div className="w-full flex justify-center">
        <div className="text-center pt-8 w-[90%]">
          {errorMessage ? (
            <div className="rounded-2xl shadow-lg bg-gray-50 p-10 text-[#FF0000] font-semibold">
              {errorMessage}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-2xl font-semibold p-5 rounded-2xl shadow-lg bg-gray-50">
              <div>
                <div>{totalUser}</div>
                <div>Users</div>
              </div>
              <div>
                <div>{totalOrder}</div>
                <div>Transactions</div>
              </div>
              <div>
                <div>{totalProduct}</div>
                <div>Products</div>
              </div>
              <div>
                <div>{totalCategories}</div>
                <div>Categories</div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-full py-8">
        <h1 className="text-3xl font-bold text-center">Contact Us</h1>
        <p className="text-lg font-semibold text-center">
          Keep Conneted With Us
        </p>
      </div>
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-[80%] text-center pb-5">
          <div className="mt-0 md:mt-10">
            <ContactUsContainer
              name={"Instagram"}
              logo={"Instagram.png"}
              desctiprion={"Find us in Instagram"}
              href={`https://www.instagram.com/${publicRuntimeConfig.INSTAGRAM_URL}/`}
            />
          </div>
          <ContactUsContainer
            name={"WhatsApp"}
            logo={"whatsapp.png"}
            desctiprion={"Contact us with WhatsApp"}
            href={`https://api.whatsapp.com/send?phone=${publicRuntimeConfig.WHATSAPP_NUMBER}`}
          />
          <div className="mt-0 md:mt-10">
            <ContactUsContainer
              name={"G-Mail"}
              logo={"gmail.webp"}
              desctiprion={"Contact us with G-Mail"}
              href={`mailto:${publicRuntimeConfig.EMAIL_ADDRESS}`}
            />
          </div>
        </div>
      </div>
    </>
  );
};

About.getLayout = navbarFooterLayot;

export default About;
