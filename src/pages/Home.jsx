import React, { useEffect } from "react";
import api from "../utils/Api";
import Navbar from "../components/Navbar";
import { bookList } from "../assets/bookList";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../../redux/slices/cartSlice";
import { addToCart } from "../../redux/slices/cartSlice";

const Home = () => {
  const updatedBookList = bookList.map((book, index) => {
    return {
      id: index + 1,
      ...book,
      count: 1,
    };
  });

  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  const addCart = (x) => {
    dispatch(addToCart(x));
  };

  // useEffect(() => {
  //   const testurl = async () => {
  //     console.log("Testing url");
  //     try {
  //       const response = await api.get("/");
  //       console.log(response.data);
  //       console.log("Complete");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   testurl();
  // }, []);
  return (
    <div>
      <Navbar />
      <h1 className="text-3xl font-extrabold text-center mt-5">
        Welcome to the Book Shop.
      </h1>

      <div className="flex flex-wrap gap-5 justify-center items-center my-10">
        {updatedBookList.map((x) => (
          <Card
            key={x.id}
            title={x.title}
            author={x.author}
            price={x.pages}
            onClick={() => addCart(x)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
