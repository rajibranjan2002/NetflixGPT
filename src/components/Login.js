// RAFCE - > React Arrow Function Component Export
import { useState, useRef } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";

import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [isSignIn, setIsSignIn] = useState(true);
  const [displayMsgColor, setDisplayMessageColor] = useState("text-red-800");
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const toogleSignInForm = () => {
    setIsSignIn(!isSignIn);
  };

  const handleButtonClick = () => {
    //Validate form data
    const isValid = checkValidData(email.current.value, password.current.value);
    if (isValid != null) {
      setErrorMessage(isValid);
    } else {
      setErrorMessage(null);
      if (!isSignIn) {
        createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log(user);
            navigate("/browse");
            setDisplayMessageColor("text-green-700");
            setErrorMessage("Successfully signed up  ✅");
            return user;
            // ...
          })
          .catch((error) => {
            setDisplayMessageColor("text-red-800");
            console.log(error);
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + "-" + errorMessage);
            return errorCode;
            // ..
          });
      } else {
        signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed in
            setDisplayMessageColor("text-green-700");
            setErrorMessage("Successfully sign in  ✅");
            const user = userCredential.user;
            navigate("/browse");

            // ...
          })
          .catch((error) => {
            setDisplayMessageColor("text-red-800");
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + "-" + errorMessage);
          });
      }
    }

    //SignIn and SignUp
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
         alt="logo" />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute p-12 my-36 mx-auto right-0 left-0  w-3/12 bg-black text-white bg-opacity-80 h-2/3"
      >
        <h1 className="font-bold font-3xl py-4 text-3xl">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignIn && (
          <input
            type="text"
            placeholder="Name"
            className="p-2 my-6 w-full bg-gray-700"
            ref={name}
          />
        )}
        <input
          type="text"
          placeholder="Email Address"
          className="p-2 my-6 w-full bg-gray-700"
          ref={email}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 my-6 w-full bg-gray-700"
          ref={password}
        />
        <p className={`${displayMsgColor} font-bold`}>{errorMessage}</p>
        <button
          type="button"
          className="p-2 my-6  bg-red-700 w-full rounded-sm"
          onClick={handleButtonClick}
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        {/* <h2 className="text-center">Forgot password ?</h2> */}
        <p className="p-2 m-2 hover:cursor-pointer" onClick={toogleSignInForm}>
          {isSignIn
            ? " New to Netflix ? Sign up now"
            : "Already Registered ? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;