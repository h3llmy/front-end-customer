import RegisterForm from "../components/form/registerForm";

const Register = () => {
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <div className="dark:bg-gray-800 border-2 bg-gray-100 border-black rounded-lg w-2/4">
        <div className="m-10">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
