import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const { username, email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      //   console.log(data);
      if (response.ok) {
        setMessage("Registration successful!");
        localStorage.setItem("token", data.auth); // Store token in localStorage
        localStorage.setItem("user", data.newUser);
        setFormData({ username: "", email: "", password: "" });
      } else {
        setMessage(data.message || "Registration failed");
      }
      navigate("/");
    } catch (error) {
      console.log("Registration error: ", error);
      setMessage("Registration failed");
    }
  };

  return (
    <>
      <div className="registration-form">
        <h2>Register</h2>
        <form onSubmit={onSubmit}>
          <div>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={onChange}
              required
            />
          </div>
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
            Register
          </button>
        </form>
        <p>{message}</p>
      </div>
    </>
  );
};

export default Register;
