import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { FaBeer } from "react-icons/fa";
import api from "./utils/Api";
import Navigation from "./Navigation";
import Home from "./pages/Home";

import { Provider } from "react-redux";
import { store } from "../redux/store";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App;
