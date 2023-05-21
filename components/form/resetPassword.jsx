import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import errorHanddler from "../../utils/errorHanddler";
import InputPassword from "../input/inputPassword";
import { fetchApi } from "../../utils/fetch";
import { getLoginCookie, setCookie } from "../../utils/cookie";
import jwtDecode from "jwt-decode";

const ResetPasswordForm = ({ token }) => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
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
      const [loginToken] = await Promise.all([
        fetchApi.put(`/auth/reset/password/${token}`, {
          newPassword,
          confirmNewPassword,
        }),
      ]);
      setCookie("user", loginToken.data.data.refreshToken);
      if (jwtDecode(loginToken.data.data.accessToken).status === "admin") {
        alert("pasword has ben reset");
      } else {
        router.push("/");
      }
    } catch (error) {
      errorHanddler(error, setErrorMessage);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <h1 className="text-4xl text-center mb-8 font-semibold">
          Reset Password
        </h1>
        <InputPassword
          name={"New Password"}
          inputValue={(value) => {
            setNewPassword(value);
          }}
          autoFocus
          onError={errorMessage.newPassword}
        />
      </div>
      <div className="mb-6">
        <InputPassword
          name={"Confirm New Password"}
          inputValue={(value) => {
            setConfirmNewPassword(value);
          }}
          onError={
            errorMessage.confirmNewPassword ||
            (typeof errorMessage == "string" && errorMessage)
          }
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="text-gray-900 bg-blue-600 border border-gray-300 focus:outline-none hover:bg-blue-800 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:text-white dark:border-gray-600 dark:hover:bg-blue-800 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
