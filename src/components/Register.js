import React, { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const container = {
    height: "100vh",
    background: "linear-gradient(#4a90e2, #80bfff)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };

  const card = {
    background: "white",
    padding: "40px 30px",
    width: "360px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 8px 18px rgba(0,0,0,0.2)"
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    color: "black",
    boxSizing: "border-box"
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "20px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      alert("Registration Successful!");
      navigate("/login");
    } catch (error) {
      alert("Registration failed!");
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={{ marginBottom: "25px" }}>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            style={inputStyle}
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            style={inputStyle}
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            style={inputStyle}
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <button style={buttonStyle}>Register</button>
        </form>

        <p style={{ marginTop: "20px" }}>
          Already registered? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
