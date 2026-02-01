import React, { useState } from "react";
import { loginUser } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await loginUser(form);   // Axios response
    const user = res.data;               // backend DTO

    localStorage.setItem("role", user.role);
    localStorage.setItem("name", user.name || "User");
    localStorage.setItem("email", user.email);
    localStorage.setItem("provider", user.provider);
    if (user.picture) {
      localStorage.setItem("picture", user.picture);
    }

    navigate("/dashboard");
  } catch (error) {
    alert(error.response?.data?.message || "Invalid credentials!");
  }
};

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    boxSizing: "border-box",
    color: "black",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "20px",
    background: "#007bff",
    color: "#fff",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  };

  const googleButtonStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    background: "#fff",
    border: "1px solid #ccc",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(#4a90e2, #80bfff)",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px 30px",
          borderRadius: "20px",
          width: "360px",
          boxShadow: "0 8px 18px rgba(0,0,0,0.2)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "25px" }}>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            style={inputStyle}
            onChange={handleChange}
            value={form.email}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            style={inputStyle}
            value={form.password}
            onChange={handleChange}
          />

          <button style={buttonStyle}>Login</button>
        </form>

        <button
          onClick={() =>
            (window.location.href =
              "http://localhost:8081/oauth2/authorization/google")
          }
          style={googleButtonStyle}
        >
          Continue with Google
        </button>

        <p style={{ marginTop: "20px", fontSize: "14px" }}>
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;