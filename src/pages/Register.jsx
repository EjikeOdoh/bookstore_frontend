import React, { useState } from "react";
import { GiBookshelf } from "react-icons/gi";
import CustomInput from "../components/CustomInput";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../utils/Api";
import Loader from "../components/Loader";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await api.post("/api/v1/auth/register", {
        firstName: fName,
        lastName: lName,
        email,
        password,
      });
      console.log(data);
      alert(data.status);
      navigate("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex items-end gap-1">
            <GiBookshelf size={40} />
            <span className="text-3xl font-black">Shop</span>
          </div>
          <div className="mt-8 w-full md:w-1/2 sm:w-1/3">
            <h1 className="text-center text-2xl font-bold mb-4">Register</h1>

            <form onSubmit={handleRegister}>
              <div className="flex gap-4">
                <CustomInput
                  label="FirstName"
                  value={fName}
                  onChange={(e) => setFName(e.target.value)}
                />
                <CustomInput
                  label="LastName"
                  value={lName}
                  onChange={(e) => setLName(e.target.value)}
                />
              </div>
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
                Register
              </button>
            </form>

            <NavLink to="/login">
              <p className="font-medium mt-8 ">Existing Customer? Login</p>
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
};

export default Register;
