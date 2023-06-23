import { navbarFooterLayot } from "../components/layout/navbarFooterLayout";

const NotFound = () => {
  return (
    <div className="w-full h-[85vh] flex items-center justify-center flex-col">
      <img src="/404.png" />
      <h1 className="pt-10 text-lg font-bold text-center">Page Not Found</h1>
    </div>
  );
};

NotFound.getLayout = navbarFooterLayot;

export default NotFound;
