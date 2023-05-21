import { useEffect, useState } from "react";
import InputText from "../input/inputText";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetchApi } from "../../utils/fetch";
import errorHanddler from "../../utils/errorHanddler";
import getConfig from "next/config";
import { getLoginCookie } from "../../utils/cookie";

const { publicRuntimeConfig } = getConfig();

const ForgetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const checkCooie = async () => {
    if (await getLoginCookie("user")) {
      router.push("/");
    }
  };

  useEffect(() => {
    checkCooie();
  }, []);

  const handdleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetchApi.post("/auth/forget/password", {
        email: email,
        url: publicRuntimeConfig.WEB_URL,
      });
      alert("check your email");
      setErrorMessage("");
    } catch (error) {
      errorHanddler(error, setErrorMessage);
      console.error(error);
    }
  };
  return (
    <form onSubmit={handdleSubmit}>
      <h1 className="text-4xl text-center mb-8 font-semibold">
        Forget Password
      </h1>
      <InputText
        name={"Email"}
        inputValue={(value) => {
          setEmail(value);
        }}
        autoFocus
        onError={errorMessage.email || errorMessage}
      />

      <div className="flex justify-between mt-4">
        <Link href={"/login"}>
          <a className="font-normal text-base px-5 py-2.5 mr-2 mb-2">
            <u className="text-blue-500">Back To Login</u>
          </a>
        </Link>
        <button
          type="submit"
          className="text-gray-900 bg-blue-600 border border-gray-300 focus:outline-none hover:bg-blue-800 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:text-white dark:border-gray-600 dark:hover:bg-blue-800 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Send Email
        </button>
      </div>
    </form>
  );
};

export default ForgetPasswordForm;
