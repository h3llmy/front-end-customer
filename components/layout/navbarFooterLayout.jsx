import { useRouter } from "next/router";
import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";
import { useEffect, useState } from "react";
import Sidebar from "../sidebar/sidebar";

export default function NavbarFooter({ children }) {
  const [sidebarButtonDisplay, setSidebarButtonDisplay] = useState(false);
  const [sidebarDisplay, setSidebarDisplay] = useState(false);

  const router = useRouter();

  useEffect(() => {
    router.pathname === "/product"
      ? setSidebarButtonDisplay(true)
      : setSidebarButtonDisplay(false);
  }, [router.pathname]);
  return (
    <>
      <Navbar
        sidebarButton={sidebarButtonDisplay}
        setSidebarVisible={setSidebarDisplay}
      />
      <div className="pt-[64px] min-h-screen">{children}</div>
      <Sidebar toggleSidebar={sidebarDisplay} />
      <Footer />
    </>
  );
}

export const navbarFooterLayot = (page) => <NavbarFooter>{page}</NavbarFooter>;
