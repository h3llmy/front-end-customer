import { useState } from "react";
import InputTextArea from "../input/inputTextArea";
import { fetchApi } from "../../utils/fetch";
import errorHanddler from "../../utils/errorHanddler";
import { getLoginCookie } from "../../utils/cookie";
import { useRouter } from "next/router";

const SelectDiscountForm = ({ children, productId, discountId }) => {
  const [noteInput, setNoteInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handdleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const cookie = await getLoginCookie("user");
      if (!cookie) {
        router.push("/login");
      }
      let payloadOrder = {
        productId: productId,
        note: noteInput,
      };
      if (discountId) {
        payloadOrder = {
          ...payloadOrder,
          discountId: discountId,
        };
      }
      const newOrder = await fetchApi.post("/order/add", payloadOrder, {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      });
      if (newOrder.data.data.redirect_url) {
        router.push(newOrder.data.data.redirect_url);
      }
      setErrorMessage("");
    } catch (error) {
      errorHanddler(error, setErrorMessage);
    }
  };

  const handdleNoteValue = (event) => {
    setNoteInput(event);
  };
  return (
    <>
      {children}
      <form onSubmit={handdleOnSubmit}>
        <div className="pt-5">
          <InputTextArea
            name={"Note"}
            autoFocus={true}
            inputValue={handdleNoteValue}
            onError={errorMessage?.note || typeof errorMessage == "string"}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 p-2 font-semibold rounded-lg mt-4 shadow-md"
        >
          Pay
        </button>
      </form>
    </>
  );
};

export default SelectDiscountForm;
