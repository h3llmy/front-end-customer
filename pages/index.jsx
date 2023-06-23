import React, { useEffect, useState } from "react";
import StickyWhatsappLogo from "../components/conteiner/stickyWhatappLogo";
import HomeCategoryLeft from "../components/conteiner/homeCategoryLeft";
import { navbarFooterLayot } from "../components/layout/navbarFooterLayout";
import HomeCategoryRight from "../components/conteiner/homeCategoryRight";

const Home = () => {
  const categories = [
    {
      name: "Website",
      imageUrl: "/gmail.webp",
      description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima ut
      eveniet dolore assumenda nostrum nihil soluta beatae accusantium
      molestiae harum, voluptatum eius illum molestias, a animi cupiditate nam
      consequatur quod. Lorem ipsum dolor, sit amet consectetur adipisicing
      elit. Minima ut eveniet dolore assumenda nostrum nihil soluta beatae
      accusantium molestiae harum, voluptatum eius illum molestias, a animi
      cupiditate nam consequatur quod. Lorem ipsum dolor, sit amet consectetur
      adipisicing elit. Minima ut eveniet dolore assumenda nostrum nihil
      soluta beatae accusantium molestiae harum, voluptatum eius illum
      molestias, a animi cupiditate nam consequatur quod.
      `,
    },
    {
      name: "Category 2",
      imageUrl: "/gmail.webp",
      description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima ut
      eveniet dolore assumenda nostrum nihil soluta beatae accusantium
      molestiae harum, voluptatum eius illum molestias, a animi cupiditate nam
      consequatur quod. Lorem ipsum dolor, sit amet consectetur adipisicing
      elit. Minima ut eveniet dolore assumenda nostrum nihil soluta beatae
      accusantium molestiae harum, voluptatum eius illum molestias, a animi
      cupiditate nam consequatur quod. Lorem ipsum dolor, sit amet consectetur
      adipisicing elit. Minima ut eveniet dolore assumenda nostrum nihil
      soluta beatae accusantium molestiae harum, voluptatum eius illum
      molestias, a animi cupiditate nam consequatur quod.
      `,
    },
    {
      name: "Category 3",
      imageUrl: "/gmail.webp",
      description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima ut
      eveniet dolore assumenda nostrum nihil soluta beatae accusantium
      molestiae harum, voluptatum eius illum molestias, a animi cupiditate nam
      consequatur quod. Lorem ipsum dolor, sit amet consectetur adipisicing
      elit. Minima ut eveniet dolore assumenda nostrum nihil soluta beatae
      accusantium molestiae harum, voluptatum eius illum molestias, a animi
      cupiditate nam consequatur quod. Lorem ipsum dolor, sit amet consectetur
      adipisicing elit. Minima ut eveniet dolore assumenda nostrum nihil
      soluta beatae accusantium molestiae harum, voluptatum eius illum
      molestias, a animi cupiditate nam consequatur quod.
      `,
    },
    {
      name: "Category 4",
      imageUrl: "/gmail.webp",
      description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima ut
      eveniet dolore assumenda nostrum nihil soluta beatae accusantium
      molestiae harum, voluptatum eius illum molestias, a animi cupiditate nam
      consequatur quod. Lorem ipsum dolor, sit amet consectetur adipisicing
      elit. Minima ut eveniet dolore assumenda nostrum nihil soluta beatae
      accusantium molestiae harum, voluptatum eius illum molestias, a animi
      cupiditate nam consequatur quod. Lorem ipsum dolor, sit amet consectetur
      adipisicing elit. Minima ut eveniet dolore assumenda nostrum nihil
      soluta beatae accusantium molestiae harum, voluptatum eius illum
      molestias, a animi cupiditate nam consequatur quod.
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
