import { dateConvert } from "../../utils/dateConvert";

const OrderContainer = ({
  productDetail,
  discount,
  onClick,
  displayButton,
  title,
}) => {
  const numberWithDots = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const countTotalPrice = () => {
    if (discount) {
      return (
        Number(productDetail?.price) -
        (Number(productDetail?.price) * Number(discount?.percentage)) / 100
      );
    } else {
      return Number(productDetail?.price);
    }
  };
  return (
    <>
      <div className="border-1 border-gray-200 flex justify-center font-medium text-2xl">
        {title}
      </div>
      <ul className="font-semibold pt-3">
        <li className="flex justify-between">
          <div>Name:</div>
          <div>{productDetail?.name}</div>
        </li>
        <li className="flex justify-between">
          <div>Category:</div>
          <div>{productDetail?.category?.name}</div>
        </li>
        <li className="flex justify-between">
          <div>Processing Time:</div>
          <div>{Number(productDetail?.dayWork) || 0} Day</div>
        </li>
        <li className="flex justify-between">
          <div>Max Revision:</div>
          <div>{Number(productDetail?.maxRevision) || 0}x</div>
        </li>
        <li className="flex justify-between">
          <div>Price:</div>
          <div>Rp.{numberWithDots(Number(productDetail?.price)) || 0}</div>
        </li>
        <li className="flex justify-between">
          <div>Discount Name:</div>
          <div>{discount?.name || "-"}</div>
        </li>
        <li className="flex justify-between">
          <div>Discount Percentage:</div>
          <div>{discount?.percentage ? `${discount.percentage}%` : "-"}</div>
        </li>
        {discount && (
          <>
            <li className="flex justify-between">
              <div>Discount Start At:</div>
              <div>{dateConvert(discount?.startAt)}</div>
            </li>
            <li className="flex justify-between">
              <div>Discount End At:</div>
              <div>{dateConvert(discount?.expiredAt)}</div>
            </li>
          </>
        )}
        <div className="py-1">
          <hr />
        </div>
        <li className="flex justify-between">
          <div>Total Price:</div>
          <div>Rp.{numberWithDots(countTotalPrice())}</div>
        </li>
        {displayButton && (
          <li>
            <button
              onClick={onClick}
              className="w-full bg-blue-500 p-2 font-semibold rounded-lg mt-4 shadow-md"
            >
              Order
            </button>
          </li>
        )}
      </ul>
    </>
  );
};

export default OrderContainer;
