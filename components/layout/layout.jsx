import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="pt-[64px] min-h-screen">{children}</div>
      <Footer />
    </>
  );
}

export const getLayout = (page) => <Layout>{page}</Layout>;
