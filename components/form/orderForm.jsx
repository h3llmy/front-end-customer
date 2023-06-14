import InputText from "../input/inputText";
import InputDate from "../input/inputDate";
import InputTextArea from "../input/inputTextArea";
import ProductDetail from "../conteiner/productDetail";

const OrderForm = ({ orderDetail, onDecline }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-5">
        <InputText
          inputValue={() => {}}
          name={"Order Id"}
          disable={true}
          defaultValue={orderDetail._id}
        />
        <InputText
          inputValue={() => {}}
          name={"Status"}
          disable={true}
          defaultValue={orderDetail.orderStatus}
        />
        <InputText
          inputValue={() => {}}
          name={"price"}
          disable={true}
          defaultValue={`Rp.${orderDetail.price}`}
        />
        <InputText
          inputValue={() => {}}
          name={"Product Name"}
          disable={true}
          defaultValue={orderDetail.productName}
        />
        <InputText
          inputValue={() => {}}
          name={"Product Category"}
          disable={true}
          defaultValue={orderDetail.productCategory}
        />
        <InputText
          inputValue={() => {}}
          name={"revision opportunity"}
          disable={true}
          defaultValue={`${
            Number(orderDetail.maxRevision) - Number(orderDetail.totalRevision)
          }x`}
        />
        <InputDate
          inputValue={() => {}}
          name={"ordered At"}
          disable={true}
          defaultValue={orderDetail?.status?.ordered}
        />
        <InputText
          inputValue={() => {}}
          name={"Discount"}
          disable={true}
          defaultValue={orderDetail?.discount?.name || "-"}
        />
      </div>
      <div className="pt-5">
        <InputTextArea
          inputValue={() => {}}
          name={"Note"}
          disable={true}
          defaultValue={orderDetail.note}
        />
      </div>
      {orderDetail?.productPreview && (
        <div className="pt-5">
          <ProductDetail
            downloadAble={true}
            name={"Product Preview"}
            defaultValue={Array(orderDetail?.productPreview)}
          />
        </div>
      )}
    </>
  );
};

export default OrderForm;
