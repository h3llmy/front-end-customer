import { dateConvert } from "../../utils/dateConvert";
import { numberWithDots } from "../../utils/numberWithDots";

const OrderDisplay = ({ order }) => {
  return (
    <div className="rounded-lg overflow-hidden bg-gray-100 hover:cursor-pointer shadow-lg flex flex-row">
      <div className="p-2">
        <img
          src={order.productId.productUrl[0]}
          alt={order?.name}
          className="object-cover w-20 h-20 rounded-lg"
        />
      </div>
      <div className="pl-3 pt-1">
        <div className="w-full flex">
          <p className="font-bold">{order?.productName}</p>
        </div>
        <div className="text-sm">
          <p>Price: Rp.{numberWithDots(order?.price)}</p>
          <p>Status: {order?.orderStatus}</p>
          <p>Order Date: {dateConvert(order?.createdAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDisplay;
