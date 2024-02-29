import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "../../redux/slices/userSlice";
import CustomInput from "../components/CustomInput";
import Navbar from "../components/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import { clearCart } from "../../redux/slices/cartSlice";

const Profile = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [detail, setDetail] = useState({
    firstName: "",
    lastName: "",
  });

  const [updateForm, setUpdateForm] = useState(false);
  const showUpdateForm = () => setUpdateForm(true);
  const hideUpdateForm = () => setUpdateForm(false);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
    } catch (error) {
    } finally {
      setLoading(false);
    }

    console.log("login");
    if (email && password) {
      console.log("Login successful!");
    } else {
      setError("Invalid email or password");
    }
  };

  const logOut = () => {
    dispatch(setUser(null));
    dispatch(clearCart([]));
    navigate("/login");
  };

  useEffect(() => {
    setDetail({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
    });
  }, []);

  return (
    <div>
      <Navbar />

      {user?.userId ? (
        <>
          <div className="mt-16">
            <div>
              <div className="flex gap-4">
                <label className="font-medium">Name : </label>
                <p className="text-lg sm:text-xl font-bold">
                  {user?.firstName} {user?.lastName}
                </p>
              </div>
              <div className="flex gap-4">
                <label className="font-medium">Email : </label>
                <p className="text-lg sm:text-xl font-bold">{user?.email}</p>
              </div>
            </div>

            <button
              className="mt-8 text-white bg-black px-4 py-1 rounded"
              onClick={updateForm ? hideUpdateForm : showUpdateForm}
            >
              {updateForm ? "Cancel" : "Click to update personal details"}
            </button>
          </div>
          {updateForm && (
            <form onSubmit={handleUpdate}>
              <div className="block sm:flex gap-4">
                <CustomInput
                  label="FirstName"
                  value={detail.firstName}
                  onChange={(e) =>
                    setDetail({ ...detail, firstName: e.target.value })
                  }
                />
                <CustomInput
                  label="LastName"
                  value={detail.lastName}
                  onChange={(e) =>
                    setDetail({ ...detail, lastName: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                className="bg-black text-white text-xs px-4 py-1 rounded mt-4"
              >
                Update
              </button>
            </form>
          )}
          <button
            className="mt-8 text-white bg-black px-4 py-1 rounded block"
            onClick={logOut}
          >
            Log out
          </button>
        </>
      ) : (
        <div className="mt-20">
          <NavLink to="/login">
            <p className="text-center">Please log in to view profile</p>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Profile;
