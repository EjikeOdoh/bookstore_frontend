import React, { useState } from "react";
import { GiBookshelf } from "react-icons/gi";
import CustomInput from "../components/CustomInput";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../utils/Api";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await api.post("/api/v1/auth/login", {
        email,
        password,
      });

      console.log(data);

      if (data.status == "Error") {
        alert(data.message);
        return;
      }

      dispatch(setUser(data));
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="flex items-end gap-1">
        <GiBookshelf size={40} />
        <span className="text-3xl font-black">Shop</span>
      </div>
      <div className="mt-8 w-full md:w-1/2 sm:w-1/3">
        <h1 className="text-center text-2xl font-bold mb-4">Login</h1>

        <form onSubmit={handleLogin}>
          <CustomInput
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <CustomInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="bg-black text-white text-xs px-4 py-1 rounded mt-4"
          >
            Login
          </button>
        </form>

        <NavLink to="/register">
          <p className="font-medium text-sm mt-8 ">
            New customer? Create account
          </p>
        </NavLink>
      </div>
    </div>
  );
};

export default Login;
