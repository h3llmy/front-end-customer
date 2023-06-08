import Link from "next/link";

const ProductDisplayContainer = ({ product }) => {
  const maxLength = 50;
  return (
    <Link href={`/product/${product?._id}`}>
      <div className="rounded-lg overflow-hidden bg-gray-100 hover:cursor-pointer shadow-lg">
        <img
          src={product?.productUrl[0]}
          alt={product?.name}
          className="w-full h-28 sm:h-40 object-cover"
        />
        <div className="w-full flex justify-center p-2">
          <p className="font-bold text-center">{product?.name}</p>
        </div>
        <div className="text-center">
          <p>
            {product?.descryption.length > maxLength
              ? `${product?.descryption.substring(0, maxLength)}...`
              : product?.descryption || ""}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductDisplayContainer;
