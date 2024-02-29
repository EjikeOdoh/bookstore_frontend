import React, { useEffect, useState } from "react";
import api from "../utils/Api";
import Navbar from "../components/Navbar";
import { bookList } from "../assets/bookList";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { selectUser } from "../../redux/slices/userSlice";
import ReactPaginate from "react-paginate";
import "../App.css";

const Home = () => {
  const updatedBookList = bookList.map((book, index) => {
    return {
      id: index + 1,
      ...book,
      count: 1,
    };
  });

  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e);
    console.log(e);
    const newArr = updatedBookList.filter((book) => {
      return book.title.toLocaleLowerCase().includes(query.toLocaleLowerCase());
    });

    console.table(newArr);
  };

  const [page, setPage] = useState(0);
  const [filterData, setFilterData] = useState();
  const n = 9;

  const dispatch = useDispatch();
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

  useEffect(() => {
    setFilterData(
      updatedBookList.filter((item, index) => {
        return (index >= page * n) & (index < (page + 1) * n);
      })
    );
  }, [page]);
  return (
    <div>
      <Navbar />
      <div className="mt-6">
        <input
          type="search"
          placeholder="Search a book"
          className="w-full bg-[#EDEDED] border border-gray-500 rounded px-4 py-2"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="mt-10">
        {user?.firstName && (
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
        {filterData &&
          filterData.map((x) => (
            <Card
              key={x.id}
              title={x.title}
              author={x.author}
              price={x.pages}
              onClick={() => addCart(x)}
            />
          ))}
      </div>
      <div className="flex justify-center items-center">
        <ReactPaginate
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          activeClassName={"activePage"}
          onPageChange={(event) => setPage(event.selected)}
          pageCount={Math.ceil(updatedBookList.length / n)}
          breakLabel="..."
          previousLabel={"Prev"}
          nextLabel={"Next"}
          marginPagesDisplayed={0}
        />
      </div>
    </div>
  );
};

export default Home;
