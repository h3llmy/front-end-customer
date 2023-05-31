import Image from "next/image";
import whatsappImage from "../../public/whatsapp.png";

const StickyWhatsappLogo = ({ children }) => {
  return (
    <>
      {children}
      <a
        href="https://api.whatsapp.com/send?phone=1234567890"
        className="fixed right-10 bottom-14 z-50"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src={whatsappImage}
          alt="WhatsApp Logo"
          title="Contact us on WhatsApp"
          width={56}
          height={56}
        />
      </a>
    </>
  );
};

export default StickyWhatsappLogo;
