export default (error, setErrorMessage) => {
  let errorMessage = "something went wrong, please retry";

  if (error.response?.data?.path) {
    errorMessage = error.response.data.path;
  } else if (error.response?.data?.message) {
    errorMessage = error.response.data.message;
  } else if (error?.message) {
    errorMessage = error.message;
  }

  if (
    typeof errorMessage === "string" &&
    errorMessage?.split(":")[0] === "TokenExpiredError"
  ) {
    errorMessage = "Token Expired";
  }

  setErrorMessage(errorMessage);
  console.error(error);
};
