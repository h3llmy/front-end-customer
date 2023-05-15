import Navbar from "../navbar/navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="pt-[64px]">{children}</div>
    </>
  );
}

export const getLayout = (page) => <Layout>{page}</Layout>;
