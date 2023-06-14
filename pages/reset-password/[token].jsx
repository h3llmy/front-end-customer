import { useRouter } from "next/router";
import ResetPasswordForm from "../../components/form/resetPassword";

const ResetPassword = () => {
  const router = useRouter();
  const token = router.query.token;
  return (
    <>
      <div className="flex items-center justify-center h-screen flex-col">
        <div className="dark:bg-gray-800 border-2 bg-gray-200 border-black rounded-lg w-4/5 md:w-2/4">
          <div className="m-5 md:m-10">
            <ResetPasswordForm token={token} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
