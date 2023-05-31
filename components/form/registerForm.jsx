import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { fetchApi } from "../../utils/fetch";
import { getLoginCookie, setCookie } from "../../utils/cookie";
import errorHanddler from "../../utils/errorHanddler";
import InputText from "../input/inputText";
import InputPassword from "../input/inputPassword";

const RegisterForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setComfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const checkCooie = async () => {
    if (await getLoginCookie("user")) {
      router.push("/");
    }
  };

  useEffect(() => {
    checkCooie();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const [registerToken] = await Promise.all([
        fetchApi.post("/auth/register", {
          email,
          username,
          password,
          confirmPassword,
        }),
      ]);
      router.push(`/verification/${registerToken.data.data.token}`);
    } catch (error) {
      errorHanddler(error, setErrorMessage);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-4xl text-center mb-5 font-semibold">Register</h1>
      <div className="mb-2">
        <InputText
          name={"Email"}
          inputValue={(value) => {
            setEmail(value);
          }}
          autoFocus
          onError={errorMessage.email}
        />
      </div>
      <div className="mb-2">
        <InputText
          name={"Username"}
          inputValue={(value) => {
            setUsername(value);
          }}
          onError={errorMessage.username}
        />
      </div>
      <div className="mb-2">
        <InputPassword
          name={"Password"}
          inputValue={(value) => {
            setPassword(value);
          }}
          onError={errorMessage.password}
        />
      </div>
      <div className="mb-2">
        <InputPassword
          name={"Confirm Password"}
          inputValue={(value) => {
            setComfirmPassword(value);
          }}
          onError={
            errorMessage.comfirmPassword ||
            (typeof errorMessage == "string" && errorMessage)
          }
        />
      </div>
      <div className="flex justify-between">
        <Link href={"/login"}>
          <a className="font-normal text-base px-5 py-2.5 mr-2 mb-2">
            <u className="text-blue-500">Already have an account?</u>
          </a>
        </Link>
        <button
          type="submit"
          className="text-gray-900 bg-blue-600 border border-gray-300 focus:outline-none hover:bg-blue-800 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:text-white dark:border-gray-600 dark:hover:bg-blue-800 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
