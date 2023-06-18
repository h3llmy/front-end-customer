const CollectionsDisplayContainer = ({ collection }) => {
  return (
    <div className="rounded-lg overflow-hidden bg-gray-100 hover:cursor-pointer shadow-lg">
      <img
        src={collection?.productUrl}
        alt={collection?.name}
        className="w-full h-28 sm:h-40 object-cover"
      />
      <div className="w-full flex justify-center p-2">
        <p className="font-bold text-center">{collection?.productName}</p>
      </div>
      <div className="text-center">
        <p>{collection?.productCategory}</p>
      </div>
    </div>
  );
};

export default CollectionsDisplayContainer;
