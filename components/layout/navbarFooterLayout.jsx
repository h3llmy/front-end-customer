import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";

export default function NavbarFooter({ children }) {
  return (
    <>
      <Navbar />
      <div className="pt-[64px] min-h-screen">{children}</div>
      <Footer />
    </>
  );
}

export const navbarFooterLayot = (page) => <NavbarFooter>{page}</NavbarFooter>;
