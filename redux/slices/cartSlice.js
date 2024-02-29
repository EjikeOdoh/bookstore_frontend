import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const current = state.cart.find((item) => item.id == action.payload.id);

      state.cart = current ? [...state.cart] : [...state.cart, action.payload];
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },

    update: (state, action) => {
      let tempCart = state.cart;
      const selectedBook = tempCart.find(
        (item) => item.id == action.payload.id
      );
      const index = tempCart.indexOf(selectedBook);
      const book = tempCart[index];
      book.count = action.payload.number;

      state.cart = [...tempCart];
    },
    decrease: (state, action) => {},
    clearCart: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, update, decrease } =
  cartSlice.actions;

export const selectCart = (state) => state.cart.cart;
export default cartSlice.reducer;
