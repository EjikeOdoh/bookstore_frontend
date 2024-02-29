import React from "react";

const Card = ({ title, author, price, onClick }) => {
  return (
    <div className="w-full md:w-2/5 sm:h-[220px] sm:flex flex-col justify-between lg:w-1/4 p-4 border border-gray-400 shadow-sm rounded-md">
      <h2 className="font-bold text-xl md:text-2xl">{title}</h2>
      <p className="text-lg font-medium ">{author}</p>
      <div className="flex justify-between items-center mt-8">
        <p className="font-bold">
          {Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
          }).format(price)}
        </p>
        <button
          onClick={onClick}
          className="bg-black text-white px-4 py-2 rounded-md text-sm"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
