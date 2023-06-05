import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";

export default function NavbarFooterSidebar({ children }) {
  return (
    <>
      <Navbar />
      <div className="pt-[64px] min-h-screen">{children}</div>
      <Sidebar />
      <Footer />
    </>
  );
}

export const navbarFooterSidebarLayot = (page) => (
  <NavbarFooterSidebar>{page}</NavbarFooterSidebar>
);
