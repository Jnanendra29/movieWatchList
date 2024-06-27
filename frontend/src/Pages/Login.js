// src/components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const { email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setMessage("Login successful!");
        setTimeout(() => {
          setMessage("");
        }, 1000);
        localStorage.setItem("token", data.auth); // Store token in localStorage
        localStorage.setItem("user", data.user._id);
        setFormData({ email: "", password: "" }); // Reset form
        navigate("/");
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (err) {
      setMessage("Login failed");
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            fontSize: "1.05rem",
            margin: "auto",
            backgroundColor: "rgb(179, 246, 224)",
            padding: "5px",
          }}
        >
          Login
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Login;
