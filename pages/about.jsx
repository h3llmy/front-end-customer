import { useEffect, useState } from "react";
import AboutContainer from "../components/conteiner/aboutContainer";
import { getLayout } from "../components/layout/layout";
import { fetchApi } from "../utils/fetch";
import errorHanddler from "../utils/errorHanddler";
import ContactUsContainer from "../components/conteiner/contactUsContainer";

const About = () => {
  const [totalUser, setTotalUser] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

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
          <div className="text-2xl md:text-6xl text-white z-[20] text-stroke text-center">
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
      <div className="w-full full bg-blue-600 p-5">
        <h1 className="w-full text-center text-4xl font-bold text-white">
          Trusted
        </h1>
        <div className="text-center pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-2xl font-semibold p-5 bg-blue-300 rounded-2xl">
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
        </div>
      </div>
      <div className="w-full py-8">
        <h1 className="text-3xl font-bold text-center">Contact Us</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 px-5 text-center pb-5">
        <ContactUsContainer name={"Instagram"} />
        <ContactUsContainer name={"Whatsapp"} logo={"whatsapp.png"} />
        <ContactUsContainer name={"E-Mail"} />
      </div>
    </>
  );
};

About.getLayout = getLayout;

export default About;
