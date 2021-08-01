import React, { useContext, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import Header from "../Header/Header";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faGoogle } from "@fortawesome/free-brands-svg-icons";
import "./Login.css";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../App";

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

const Login = () => {
    const [ loggedInUser, setLoggedInUser] = useContext(UserContext)
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
  const [option, setoption] = useState("login");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    isSignedIn: false,
    error: "",
  });
  console.log(loggedInUser);
 
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = useRef({});
  password.current = watch("password", "");


  const signupSubmit = async (data) => {
    const userDetails = { ...user };
    userDetails.name = data.name;
    userDetails.password = data.password;
    userDetails.email = data.email;
    setUser(userDetails);
    setLoggedInUser(userDetails);
    

    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((userCredential) => {
        var user = userCredential.user;
        var { displayName, email } = userCredential.user;
        const userDetails = { ...user };
        userDetails.name = displayName;
        userDetails.isSignedIn = true;
        userDetails.email = email;
        updateUserName(data.name);
        setUser(userDetails);
        setLoggedInUser(userDetails);
        history.replace(from);
        console.log("object", userCredential.user);
        console.log(userDetails);
      })
      .catch((error) => {
        console.log(error.code, error.message);
        const userDetails = { ...user };
        userDetails.error = error.message;
        setUser(userDetails);
        setLoggedInUser(userDetails);
      });
  };

  const loginSubmit = (values) => {
    console.log(values);

     firebase
  .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then((userCredential) => {
        var user = userCredential.user;
        var { displayName, email } = userCredential.user;
        const userDetails = { ...user };
        userDetails.name = displayName;
        userDetails.isSignedIn = true;
        userDetails.email = email;
        setUser(userDetails);
        setLoggedInUser(userDetails);
        history.replace(from);
        console.log("signinuser", user.displayName);
      })
     .catch((error) => {
        console.log(error.code, error.message);
        const userDetails = { ...user };
        userDetails.error = error.message;
        setUser(userDetails);
        setLoggedInUser(userDetails);
      });
  };

  const updateUserName = (name) => {
    var user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: name,
      })
      .then(function () {
        console.log("Update successful.");
      })
      .catch(function (error) {
        console.log(error.code, error.message);
      });
  };
  
  const googleSignIn = () =>{
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase
          .auth()
          .signInWithPopup(provider)
          .then((result) => {
            var { displayName, email } = result.user;
            const userDetails = { ...user };
            userDetails.googleName = displayName;
            userDetails.isSignedIn = true;
            userDetails.email = email;
            setUser(userDetails);
            setLoggedInUser(userDetails)
            history.replace(from);
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            console.log(errorCode, errorMessage, email, credential);
            const userDetails = { ...user };
            userDetails.error = errorMessage;
            setUser(userDetails);
            setLoggedInUser(userDetails);
          });
      
  };

  return (
    <div>
      <Header></Header>
      <Container>
        {option === 'login' && (
          <div>
            <form
              className="p-5 mt-3 shadow"
              style={{ backgroundColor: "#fafafa" }}
              onSubmit={handleSubmit(loginSubmit)}
            >
              <h1>Login Here</h1> 
              <br />
              <input
                name="email"
                className="form-control"
                placeholder="Your Email"
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
              />

              {errors.email && errors.email.type === "required" && (
                <span className="text-danger">Email is required</span>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <span className="text-danger">
                  Please , type correct email address !
                </span>
              )}

              <br />
              <input
                name="password"
                className="form-control"
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 8,
                    message: "Password must have at least 8 characters",
                  },
                })}
              />
              <p style={{ color: "red" }}>
                {errors.password && <span>{errors.password.message}</span>}
              </p>
              <br />
              <p style={{ color: "red" }}> {user.error} </p>
              <button type="submit" className="login-btn">
              Login
            </button>
            </form>
            <p className="mt-2 optional-option">
              Don’t have an account?{" "}
              <button onClick={() => setoption("signup")}>
                Create an account
              </button>{" "}
            </p>
          </div>
        )}
        {option === 'signup' && (
          <div>
            <form
              className="p-5 mt-3 shadow"
              style={{ backgroundColor: "#fafafa" }}
              onSubmit={(e) => e.preventDefault()}
            >
              <h1>Create an account </h1>
              <br />
              <input
                name="name"
                className="form-control"
                placeholder="Your Name"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-danger">Name is required</span>
              )}

              <br />
              <input
                name="email"
                className="form-control"
                placeholder="Your Email"
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
              />

              {errors.email && errors.email.type === "required" && (
                <span className="text-danger">Email is required</span>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <span className="text-danger">
                  Please , type correct email address !
                </span>
              )}

              <br />
              <input
                name="password"
                className="form-control"
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 8,
                    message: "Password must have at least 8 characters",
                  },
                })}
              />
              <p style={{ color: "red" }}>
                {errors.password && <span>{errors.password.message}</span>}
              </p>
              <br />
              <input
                name="password_repeat"
                type="password"
                placeholder="Confirm Password"
                className="form-control"
                {...register("password_repeat", {
                  required: true,
                  minLength: 8,
                  validate: (value) =>
                    value === password.current || "The passwords do not match",
                })}
              />
              {errors.password_repeat && (
                <p className="text-danger">{errors.password_repeat.message}</p>
              )}

              <br />
              <p style={{ color: "red" }}> {user.error} </p>
              <input
              type="submit"
              onClick={handleSubmit(signupSubmit)}
              className="login-btn"
              value="Sign Up"
            />
            </form>
            <p className=" mt-2 optional-option">
              Already have an account?{" "}
              <button onClick={() => setoption("login")}>Login</button>{" "}
            </p>
          </div>
        )}
         <div className="social-login-option">
        <p className="or">Or</p>
        <button className="login-btn " onClick={googleSignIn}>
          <span className="btn-white">
            <FontAwesomeIcon className="google" icon={faGoogle} />
          </span>{" "}
          <span className="social-text">Continue with Google</span>
        </button> 
        {/* <br />
        <button className="login-btn mt-3">
          <span className="btn-white">
            <FontAwesomeIcon className="fb" icon={faFacebook} />
          </span>{" "}
          <span className="social-text">Continue with Facebook</span>
        </button> */}
      </div>
      </Container>
    </div>
  );
};

export default Login;
