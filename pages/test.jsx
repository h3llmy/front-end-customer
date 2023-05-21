import { useEffect } from "react";
import { getLayout } from "../components/layout/layout";

const Test = () => {
  useEffect(() => {
    const link = document.createElement("a");
    link.href = "sai-admin://forget-password";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);
  return <div></div>;
};

Test.getLayout = getLayout;
export default Test;
