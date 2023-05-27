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
        <img
          src={"whatsapp.png"}
          alt="WhatsApp Logo"
          title="contact us on whatsapp"
          className="w-14 h-14"
        />
      </a>
    </>
  );
};

export default StickyWhatsappLogo;
