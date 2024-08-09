import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  console.log(user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser);
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-screen flex justify-between">
      <img
        className="w-56 "
        src= "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="Logo"
      />
      {user && (
        <div className="flex">
          <img
            className="w-14 h-24 m-2 py-4"
            src="https://icon-library.com/images/default-user-icon/default-user-icon-3.jpg"
            alt="User"
          />
          <p
            className="text-white font-bold text-2xl m-4 p-4 flex hover:cursor-pointer"
            onClick={handleSignOut}
          >
            Sign out
          </p>
        </div>
      )}
    </div>
  );
};

export default Header;