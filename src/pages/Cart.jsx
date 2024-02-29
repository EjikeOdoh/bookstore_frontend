import React from "react";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { selectCart } from "../../redux/slices/cartSlice";
import CartItem from "../components/CartItem";
import { removeFromCart, update } from "../../redux/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  console.log(cart);

  const add = (num, item) => {
    dispatch(update({ id: item.id, number: num }));
  };

  const reduce = (num, item) => {
    dispatch(update({ id: item.id, number: num }));
  };

  const remove = (x) => {
    dispatch(removeFromCart(x));
  };
  return (
    <div>
      <Navbar />
      <div className="flex flex-col gap-10">
        {cart.map((x) => (
          <CartItem
            key={x.id}
            id={x.id}
            title={x.title}
            author={x.author}
            price={x.pages}
            count={x.count}
            removeItem={() => remove(x)}
            increment={(y) => add(y, x)}
            decrement={(y) => reduce(y, x)}
          />
        ))}
      </div>
    </div>
  );
};

export default Cart;
