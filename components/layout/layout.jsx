import Navbar from "../navbar/navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="pt-[60px]">{children}</div>
    </>
  );
}

export const getLayout = (page) => <Layout>{page}</Layout>;
