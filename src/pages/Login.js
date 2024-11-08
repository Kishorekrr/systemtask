import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/actions/authActions";
import "../styles/Login.css";
import { LuEye, LuEyeOff } from "react-icons/lu"; 
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false); 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(login(username, password, navigate, setErrors));
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible); 
  };

  return (
    <div className="Login">
      <div className="login-container">
        <h2>Login</h2>

        <form onSubmit={handleSubmit} className="form-field">
          {errors.form && <div className="error-msg">{errors.form}</div>}

          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
            {errors.username && <div className="error">{errors.username}</div>}
          </div>

          <div className="password-container">
            <input
              type={passwordVisible ? "text" : "password"} 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <span
              className="password-toggle-icon"
              onClick={togglePasswordVisibility} 
            >
              {passwordVisible ? (
                <LuEye color="#585858" />
              ) : (
                <LuEyeOff color="#585858" />
              )}
            </span>
            {errors.password && <div className="error">{errors.password}</div>}
          </div>

          <button style={{ width: "100%" }} type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
