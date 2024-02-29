import React, { useEffect } from "react";
import api from "../utils/Api";
import Navbar from "../components/Navbar";
import { bookList } from "../assets/bookList";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../../redux/slices/cartSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import { selectUser } from "../../redux/slices/userSlice";

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
  const user = useSelector(selectUser);

  const addCart = (x) => {
    dispatch(addToCart(x));
  };

  useEffect(() => {
    const testurl = async () => {
      console.log("Testing url");
      try {
        const response = await api.get("/");
        console.log(response.data);
        console.log("Complete");
      } catch (error) {
        console.log(error);
      }
    };

    testurl();
  }, []);
  return (
    <div>
      <Navbar />

      <div className="mt-6">
        <input
          type="search"
          placeholder="Search a book"
          className="w-full bg-[#EDEDED] border border-gray-500 rounded px-4 py-2"
        />
      </div>

      <div className="mt-10">
        {user?.userId && (
          <p className="sm:text-center font-medium">
            Hello{" "}
            <span className="font-bold text-red-500">
              {user?.firstName} {user?.lastName}
            </span>
          </p>
        )}
        <h1 className=" text-2xl sm:text-3xl font-extrabold sm:text-center ">
          Welcome to the Book Shop.
        </h1>
      </div>

      <div className="flex flex-wrap gap-5 justify-evenly items-center my-10">
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
