import { useRouter } from "next/router";
import { getLayout } from "../../components/layout/layout";

const Detail = () => {
  const router = useRouter();
  const slug = router.query.id;
  return (
    <>
      <p>{slug}</p>
    </>
  );
};

Detail.getLayout = getLayout;

export default Detail;
