import { useEffect } from "react";
import { navbarFooterLayot } from "../components/layout/navbarFooterLayout";

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

Test.getLayout = navbarFooterLayot;
export default Test;
