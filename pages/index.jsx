import React from "react";
import { getLayout } from "../components/layout/layout";
import StickyWhatsappLogo from "../components/conteiner/stickyWhatappLogo";
import HomeCategory from "../components/conteiner/homeCategory";

const Home = () => {
  return (
    <>
      <div className="h-[40vh] md:h-[89vh] flex items-center justify-center">
        <div className="absolute items-center flex left-10 text-5xl font-semibold text-white">
          <div className="flex flex-col">
            <div className="text-2xl md:text-5xl text-white z-[20] text-stroke">
              Jasa Penjualan Produk Digital
            </div>
            <div className="text-lg md:text-3xl text-white z-[20] text-stroke">
              Terpercaya Di Seluruh
            </div>
            <div className="text-lg md:text-3xl text-white z-[20] text-stroke">
              Indonesia
            </div>
          </div>
        </div>
        <img
          className="h-full w-full object-cover z-[10]"
          src={"What_is_Information_Technology.webp"}
          alt="index image"
        />
      </div>
      <div className="md:mr-[20vw]">
        <HomeCategory />
      </div>
      <StickyWhatsappLogo />
    </>
  );
};

Home.getLayout = getLayout;

export default Home;
