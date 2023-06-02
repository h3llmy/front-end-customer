import Link from "next/link";

const ContactUsContainer = ({ name, logo }) => {
  return (
    // <Link href={"tel:+628980184353"}>
    <div className="border-2 border-gray-500 rounded-lg shadow-lg bg-white">
      <div className="w-full flex items-center justify-center">
        <img src={logo} alt="" className="w-[40%] p-5" />
      </div>
      <div className="text-lg font-semibold p-2">{name}</div>
    </div>
    // </Link>
  );
};

export default ContactUsContainer;
