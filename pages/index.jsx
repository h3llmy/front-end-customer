import React, { useEffect, useState } from "react";
import StickyWhatsappLogo from "../components/conteiner/stickyWhatappLogo";
import HomeCategoryLeft from "../components/conteiner/homeCategoryLeft";
import { navbarFooterLayot } from "../components/layout/navbarFooterLayout";
import HomeCategoryRight from "../components/conteiner/homeCategoryRight";

const Home = () => {
  const categories = [
    {
      name: "Keamanan Terjamin",
      imageUrl: "/keamanan.jpg",
      description: `Keamanan digital merujuk pada praktik-praktik dan teknologi-teknologi 
      yang dirancang untuk melindungi informasi, data, dan sistem komputer dari ancaman dan 
      serangan yang mungkin timbul di dunia maya. Ini mencakup langkah-langkah seperti enkripsi 
      data, otentikasi dua faktor, pemantauan jaringan, perangkat lunak antivirus, dan kebijakan akses yang ketat. 
      Tujuan utamanya adalah untuk menjaga kerahasiaan, integritas, dan ketersediaan informasi, 
      serta mencegah perusakan atau penyalahgunaan oleh pihak-pihak yang tidak sah. 
      Keamanan digital menjadi semakin penting seiring dengan peningkatan ketergantungan terhadap 
      teknologi digital dalam berbagai aspek kehidupan, termasuk bisnis, pemerintahan, dan komunikasi pribadi.
      `,
    },
    {
      name: "Terpercaya",
      imageUrl: "/kepercayaan.jpg",
      description: `PT Semua Aplikasi Indonesia adalah perusahaan terkemuka 
      dalam pengembangan solusi aplikasi digital inovatif. Dengan tim berpengalaman, 
      perusahaan ini berfokus pada menciptakan solusi yang relevan dengan berbagai industri, 
      mendukung transformasi digital, dan membangun hubungan yang saling menguntungkan dengan klien dan mitra bisnis.
      `,
    },
    {
      name: "Konsisten",
      imageUrl: "/konsisten.webp",
      description: `Keberhasilan PT Semua Aplikasi Indonesia dalam mempertahankan kualitas 
      produk digitalnya adalah hasil dari konsistensi yang kuat dalam pendekatan pengembangan. 
      Perusahaan ini secara terus-menerus mengutamakan inovasi, keamanan, dan kinerja optimal 
      dalam setiap solusi yang dihasilkan. Melalui pengawasan ketat dan proses pengujian yang 
      teliti, PT Semua Aplikasi Indonesia menjaga reputasi sebagai penyedia produk digital yang 
      handal dan memenuhi standar kualitas tertinggi. Dengan komitmen untuk terus meningkatkan 
      dan menghadirkan produk-produk yang relevan dengan perkembangan teknologi, perusahaan ini 
      berhasil membangun kepercayaan dan loyalitas pelanggan serta mengukuhkan posisinya di industri aplikasi digital.
      `,
    },
    {
      name: "Berkualitas",
      imageUrl: "/berkualitas.png",
      description: `Produk digital yang dihasilkan oleh PT Semua Aplikasi Indonesia 
      adalah cerminan dari dedikasi mereka terhadap kualitas yang unggul. 
      Dengan menggabungkan desain intuitif, fungsionalitas yang canggih, dan performa yang handal, 
      setiap produk digital mencerminkan standar tertinggi dalam pengembangan. 
      Proses pengembangan yang teliti dan penerapan praktik terbaik dalam industri memastikan 
      bahwa produk-produk tersebut tidak hanya memenuhi harapan pelanggan, tetapi juga memimpin 
      dalam inovasi dan memberikan pengalaman yang luar biasa. Keberhasilan PT Semua Aplikasi 
      Indonesia dalam menghasilkan produk digital berkualitas telah membantu membangun reputasi 
      mereka sebagai pemimpin dalam industri aplikasi digital.
      `,
    },
  ];

  const [visibleCategories, setVisibleCategories] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      const updatedVisibleCategories = {};

      categories.forEach((category) => {
        const categoryElement = document.getElementById(category.name);

        if (categoryElement) {
          const elementPosition = categoryElement.offsetTop;
          const elementHeight = categoryElement.offsetHeight;

          if (
            scrollPosition + windowHeight >=
            elementPosition + elementHeight / 2
          ) {
            updatedVisibleCategories[category.name] = true;
          } else {
            updatedVisibleCategories[category.name] = false;
          }
        }
      });

      setVisibleCategories(updatedVisibleCategories);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [categories]);
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
      <h3 className="w-full flex justify-center text-center pt-10 font-semibold text-4xl">
        Kenapa Memilih Kami?
      </h3>
      {categories.map((category, index) => (
        <div
          id={category.name}
          key={category.name}
          className="overflow-hidden py-10"
        >
          {index % 2 === 1 ? (
            <HomeCategoryRight
              name={category.name}
              imageUrl={category.imageUrl}
              description={category.description}
              isVisible={visibleCategories[category.name] || false}
            />
          ) : (
            <HomeCategoryLeft
              name={category.name}
              imageUrl={category.imageUrl}
              description={category.description}
              isVisible={visibleCategories[category.name] || false}
            />
          )}
        </div>
      ))}
      <StickyWhatsappLogo />
    </>
  );
};

Home.getLayout = navbarFooterLayot;

export default Home;
