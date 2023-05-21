import { useState, useEffect } from "react";
import InputText from "../input/inputText";
import { fetchApi } from "../../utils/fetch";
import errorHanddler from "../../utils/errorHanddler";
import { useRouter } from "next/router";
import { setCookie } from "../../utils/cookie";

const VerificationForm = ({ token }) => {
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTime, setResendTime] = useState(60);

  const router = useRouter();

  const handleResendOTP = async () => {
    try {
      if (!resendDisabled) {
        await fetchApi.put(`auth/resend/otp/${token}`);
        setResendDisabled(true);
        setResendTime(60);
        alert("new otp sent");
      }
    } catch (error) {
      errorHanddler(error, setErrorMessage);
    }
  };

  useEffect(() => {
    let timer;
    if (resendTime > 0 && resendDisabled) {
      timer = setInterval(() => {
        setResendTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (resendTime === 0 && resendDisabled) {
      setResendDisabled(false);
    }

    return () => {
      clearInterval(timer);
    };
  }, [resendTime, resendDisabled]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetchApi.put(`/auth/update/status/${token}`, {
        otp: otp,
      });
      setErrorMessage("");
      setCookie("user", response.data.data.refreshToken);
      router.push("/");
    } catch (error) {
      errorHanddler(error, setErrorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-4xl text-center mb-8 font-semibold">Enter OTP</h1>
      <InputText
        name={"OTP"}
        inputValue={(value) => {
          setOtp(value);
        }}
        autoFocus
        onError={errorMessage.otp || errorMessage}
      />

      <div className="flex justify-between mt-4">
        <a
          onClick={handleResendOTP}
          disabled={resendDisabled}
          className={`font-normal text-base px-5 py-2.5 mr-2 mb-2 ${
            resendDisabled ? "text-gray-500" : "text-blue-500"
          }`}
        >
          {resendDisabled ? (
            <p>Resend OTP {resendTime}</p>
          ) : (
            <u className="text-blue-500 hover:cursor-pointer">Resend OTP</u>
          )}
        </a>

        <button
          type="submit"
          className="text-gray-900 bg-blue-600 border border-gray-300 focus:outline-none hover:bg-blue-800 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:text-white dark:border-gray-600 dark:hover:bg-blue-800 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default VerificationForm;
