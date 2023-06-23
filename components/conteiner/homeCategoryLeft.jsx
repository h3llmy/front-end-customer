const HomeCategoryLeft = ({ name, imageUrl, description, isVisible }) => {
  return (
    <div
      className={`transition-opacity ${
        isVisible ? " duration-500 opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`p-10 transition-transform duration-300 ${
          isVisible ? "-translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-full md:w-[80%] justify-end">
          <h1 className="w-full flex justify-center pb-5 text-3xl text-center">
            {name}
          </h1>
          <div className="flex md:space-x-10 md:flex-row flex-col-reverse items-center">
            <div className="max-h-[200px] w-full overflow-y-auto text-center md:text-left">
              <p>{description}</p>
            </div>
            <img
              className="max-w-[50%] max-h-[200px] pb-4 md:pb-0 object-contain"
              src={imageUrl}
              alt="Category Image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCategoryLeft;
