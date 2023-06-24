import axios from "axios";
import { useEffect, useState } from "react";

const CollectionsDisplayContainer = ({ collection }) => {
  const [productImage, setProductImage] = useState(null);
  const fetchFile = async () => {
    try {
      const fileName = collection?.productUrl.split(/[/|-]+/).pop();
      const response = await axios.get(collection?.productUrl, {
        responseType: "blob",
      });
      const file = new File([response.data], fileName, {
        type: response.data.type,
      });
      if (response.data.type.split("/")[0] === "image") {
        setProductImage(URL.createObjectURL(file));
      } else {
        setProductImage("/file.png");
      }
    } catch (error) {
      setProductImage("/404.png");
    }
  };
  useEffect(() => {
    fetchFile();
  }, [collection]);
  return (
    <div className="rounded-lg overflow-hidden bg-gray-100 hover:cursor-pointer shadow-lg">
      <img
        src={productImage}
        alt={collection?.name}
        className="w-full h-28 sm:h-40 object-cover"
      />
      <div className="w-full flex justify-center p-2">
        <p className="font-bold text-center">{collection?.productName}</p>
      </div>
      <div className="text-center">
        <p>{collection?.productCategory}</p>
      </div>
    </div>
  );
};

export default CollectionsDisplayContainer;
