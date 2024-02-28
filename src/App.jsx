import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { FaBeer } from "react-icons/fa";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-center">
      <h1 className="text-3xl font-bold underline text-center">Hello world!</h1>
      <FaBeer />
    </div>
  );
}

export default App;
