import React from "react";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { selectCart } from "../../redux/slices/cartSlice";
import CartItem from "../components/CartItem";
import {
  removeFromCart,
  increase,
  decrease,
  clearCart,
} from "../../redux/slices/cartSlice";
import { selectUser } from "../../redux/slices/userSlice";
import { NavLink } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);

  const totalAmount = cart
    .map((x) => x.count * x.pages)
    .reduce((x, y) => x + y, 0);

  const add = (id) => {
    dispatch(increase(id));
  };

  const reduce = (id) => {
    dispatch(decrease(id));
  };

  const remove = (x) => {
    dispatch(removeFromCart(x));
  };

  const emptyCart = () => {
    dispatch(clearCart([]));
  };
  return (
    <div>
      <Navbar />
      {user?.userId ? (
        cart.length > 1 ? (
          <>
            <div className="flex flex-col gap-10 mt-10">
              {cart.map((x) => (
                <CartItem
                  key={x.id}
                  id={x.id}
                  title={x.title}
                  author={x.author}
                  price={x.pages}
                  count={x.count}
                  removeItem={() => remove(x)}
                  increment={(y) => add(x.id)}
                  decrement={(y) => reduce(x.id)}
                />
              ))}
            </div>
            <div className="flex justify-end">
              <button
                onClick={emptyCart}
                className="mt-10  px-4 rounded text-red-500 font-bold"
              >
                Empty Cart
              </button>
            </div>
            <div className="mt-12 flex justify-between items-center">
              <p className="font-bold text-base">Total</p>
              <p className="bg-black text-white px-4 py-2 rounded-lg font-black text-xl">
                {Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                }).format(totalAmount)}
              </p>
            </div>
            <div className="flex items-center justify-center mt-8">
              <button className="bg-green-600 text-white font-bold text-2xl px-10 py-4 rounded-xl">
                CheckOut
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-center font-medium mt-10">Your cart is empty</p>
            <NavLink to="/">
              <p className="text-center m-4 text-sm ">Back to Home</p>
            </NavLink>
          </>
        )
      ) : (
        <div className="mt-20">
          <NavLink to="/login">
            <p className="text-center">Please log in to view cart</p>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Cart;
