import { useState } from "react";
import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";

export default function NavbarFooterSidebar({ children }) {
  const [sidebarDisplay, setSidebarDisplay] = useState(true);
  return (
    <>
      <Navbar setSidebarVisible={setSidebarDisplay} sidebarButton={true} />
      <div className="pt-[64px] min-h-screen">{children}</div>
      <Sidebar toggleSidebar={sidebarDisplay} />
      <Footer />
    </>
  );
}

export const navbarFooterSidebarLayot = (page) => (
  <NavbarFooterSidebar>{page}</NavbarFooterSidebar>
);
