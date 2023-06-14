import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { fetchApi } from "../../utils/fetch";
import { getLoginCookie, setCookie } from "../../utils/cookie";
import errorHanddler from "../../utils/errorHanddler";
import InputText from "../input/inputText";
import InputPassword from "../input/inputPassword";

const LoginForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const checkCooie = async () => {
    try {
      if (await getLoginCookie("user")) {
        router.push("/");
      }
    } catch (error) {
      errorHanddler(error, setErrorMessage);
    }
  };

  useEffect(() => {
    checkCooie();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const loginToken = await fetchApi.post("/auth/login", {
        username,
        password,
      });
      setCookie("user", loginToken.data.data.refreshToken);
      router.back();
    } catch (error) {
      errorHanddler(error, setErrorMessage);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <h1 className="text-4xl text-center mb-8 font-semibold">Login</h1>
        <InputText
          name={"Username"}
          inputValue={(value) => {
            setUsername(value);
          }}
          autoFocus
          onError={errorMessage.username}
        />
      </div>
      <div className="mb-2">
        <InputPassword
          name={"Password"}
          inputValue={(value) => {
            setPassword(value);
          }}
          onError={
            errorMessage.password ||
            (typeof errorMessage == "string" && errorMessage)
          }
        />
      </div>
      <div className="lg:flex lg:justify-between">
        <div className="font-normal text-base px-5 py-2.5 mr-2 mb-2 w-full">
          <Link href={"/forget-password"}>
            <u className="text-blue-500 hover:cursor-pointer">
              forget your password?
            </u>
          </Link>
          {" or "}
          <Link href={"/register"}>
            <u className="text-blue-500 hover:cursor-pointer">
              Don't have an account?
            </u>
          </Link>
        </div>
        <div className="w-full md:w-fit flex justify-end">
          <button
            type="submit"
            className="text-gray-900 bg-blue-600 border border-gray-300 focus:outline-none hover:bg-blue-800 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:text-white dark:border-gray-600 dark:hover:bg-blue-800 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
