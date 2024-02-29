import React from "react";
import { NavLink } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { GiBookshelf } from "react-icons/gi";

import { useSelector } from "react-redux";
import { selectCart } from "../../redux/slices/cartSlice";

const Navbar = () => {
  const cart = useSelector(selectCart);

  const totalCartItems = cart.map((x) => x.count).reduce((x, y) => x + y, 0);

  return (
    <div className="flex justify-between gap-4 sm:gap-20 items-center">
      <NavLink to="/" className="flex items-end gap-1">
        <GiBookshelf size={30} />
        <span className="hidden sm:block">Shop</span>
      </NavLink>
      <div className="flex-1 bg-slate-400 rounded">
        <input type="search" className="w-full bg-transparent p-2" />
      </div>
      <div className="flex gap-8 sm:gap-20">
        <NavLink to="/cart" className="flex gap-2">
          <span className="hidden sm:block">Cart</span>
          <div className="relative">
            <FaCartPlus size={24} />
            <div className="absolute -top-2 -right-5 w-3 h-3  rounded-sm border border-black flex justify-center items-center p-2">
              <span className="font-bold text-xs">{totalCartItems}</span>
            </div>
          </div>
        </NavLink>
        <NavLink className="flex items-center gap-2">
          <span className="hidden sm:block">Profile</span>
          <MdAccountCircle size={24} />
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
