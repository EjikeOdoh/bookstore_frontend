import React, { useState } from "react";

const CartItem = ({
  id,
  title,
  author,
  count = 1,
  price,
  increment,
  decrement,
  removeItem,
}) => {
  const [num, setNum] = useState(count);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div>
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-sm">{author}</p>
        </div>
        <p className="text-xl font-extrabold">
          {Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
          }).format(price)}
        </p>
      </div>

      <div className="flex justify-between">
        <button
          onClick={removeItem}
          className="bg-red-600 px-4 rounded text-white text-xs"
        >
          Remove book
        </button>
        <div>
          <button
            className="bg-black px-2 rounded text-white"
            onClick={() => {
              setNum((prev) => {
                return prev > 1 ? prev - 1 : 1;
              });
              decrement();
            }}
          >
            -
          </button>
          <span className="mx-8 font-bold">{num}</span>
          <button
            className="bg-green-500 px-2 text-white rounded"
            onClick={() => {
              setNum((prev) => prev + 1);
              increment();
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
