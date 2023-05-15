import { useRouter } from "next/router";
import { getLayout } from "../components/layout/layout";

const Home = () => {
  const router = useRouter();
  return (
    <div className="" onClick={() => router.push("/test")}>
      <p>mantap</p>
      <p>mantap</p>
    </div>
  );
};

Home.getLayout = getLayout;
export default Home;
