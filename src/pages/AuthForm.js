// src/pages/AuthForm.js
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login, addUser } from "../store";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css";

function AuthForm() {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.auth.users);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = (data) => {
    if (isLogin) {
      // Login logic
      const user = users.find((user) => user.username === data.username);
      if (user && user.password === data.password) {
        dispatch(login(data));
        setError("");
        navigate("/pokedex");
      } else {
        setError(
          "User does not exist or incorrect password. Please sign up first."
        );
      }
    } else {
      // Signup logic
      const existingUser = users.find(
        (user) => user.username === data.username
      );
      if (existingUser) {
        setError("User already exists. Please login.");
        return;
      }

      dispatch(addUser(data));
      setSuccessMessage("Signup successful. Please switch to login page.");
      setError("");
      reset(); // Clear form fields
    }
  };

  const handleModeSwitch = () => {
    setIsLogin(!isLogin);
    setError("");
    setSuccessMessage("");
    reset(); // Clear form fields when switching modes
  };

  return (
    <>
      <div className="auth-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Username:</label>
            <input type="text" {...register("username")} required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" {...register("password")} required />
          </div>
          <button type="submit">{isLogin ? "Login" : "Signup"}</button>
          {error && <p className="error-message">{error}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
        </form>
        <button onClick={handleModeSwitch}>
          {isLogin ? "Switch to Signup" : "Switch to Login"}
        </button>
      </div>
    </>
  );
}

export default AuthForm;
