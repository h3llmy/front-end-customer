import { useRouter } from "next/router";
import ResetPasswordForm from "../../components/form/resetPassword";

const ResetPassword = () => {
  const router = useRouter();
  const token = router.query.token;
  return (
    <>
      <div className="flex items-center justify-center h-screen flex-col">
        <div className="dark:bg-gray-800 border-2 bg-gray-100 border-black rounded-lg w-2/4">
          <div className="m-10">
            <ResetPasswordForm token={token} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
