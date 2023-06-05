import Link from "next/link";

const ContactUsContainer = ({ name, logo, href, desctiprion }) => {
  return (
    <Link href={href}>
      <a target="_blank">
        <div className="w-full h-full flex justify-center rounded-2xl border-2 border-gray-100">
          <div className="w-full max-w-lg shadow-lg bg-gray-50 rounded-2xl">
            <div className="h-full flex flex-col justify-between">
              <div className="flex items-center justify-center">
                <img src={logo} alt="" className="h-32 p-5" />
              </div>
              <div>
                <div className="text-lg font-semibold p-2">{name}</div>
                <div className="pb-5">{desctiprion}</div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ContactUsContainer;
