import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNewUser } from "../api/auth";

const NewUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      setMessage({ type: "error", text: "First Name is required" });
      return false;
    }
    if (!formData.lastName.trim()) {
      setMessage({ type: "error", text: "Last Name is required" });
      return false;
    }
    if (!formData.email.trim()) {
      setMessage({ type: "error", text: "Email is required" });
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage({ type: "error", text: "Invalid email format" });
      return false;
    }
    if (!formData.mobileNo.trim()) {
      setMessage({ type: "error", text: "Mobile Number is required" });
      return false;
    }
    if (!/^\d{10,15}$/.test(formData.mobileNo.replace(/[-\s]/g, ""))) {
      setMessage({
        type: "error",
        text: "Mobile number must be 10-15 digits",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const response = await addNewUser(formData);

      setMessage({
        type: "success",
        text: "User added successfully!",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobileNo: "",
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to add user",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <div style={styles.header}>
          <h1 style={styles.title}>Add New User</h1>
          <p style={styles.subtitle}>Fill in the details to create a new user</p>
        </div>

        {message.text && (
          <div
            style={{
              ...styles.message,
              ...(message.type === "error"
                ? styles.messageError
                : styles.messageSuccess),
            }}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>First Name *</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              style={styles.input}
              disabled={loading}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Last Name *</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
              style={styles.input}
              disabled={loading}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              style={styles.input}
              disabled={loading}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Mobile Number *</label>
            <input
              type="tel"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              placeholder="Enter mobile number (10-15 digits)"
              style={styles.input}
              disabled={loading}
            />
          </div>

          <div style={styles.buttonGroup}>
            <button
              type="submit"
              style={styles.submitBtn}
              disabled={loading}
            >
              {loading ? "Adding User..." : "Add User"}
            </button>
            <button
              type="button"
              style={styles.cancelBtn}
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    padding: "20px",
  },
  formWrapper: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    padding: "40px",
    width: "100%",
    maxWidth: "500px",
  },
  header: {
    marginBottom: "30px",
    textAlign: "center",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1e293b",
    margin: "0 0 10px 0",
  },
  subtitle: {
    fontSize: "14px",
    color: "#64748b",
    margin: 0,
  },
  message: {
    padding: "12px 16px",
    borderRadius: "6px",
    marginBottom: "20px",
    fontSize: "14px",
    fontWeight: "500",
  },
  messageError: {
    backgroundColor: "#fee2e2",
    color: "#dc2626",
    border: "1px solid #fecaca",
  },
  messageSuccess: {
    backgroundColor: "#dcfce7",
    color: "#16a34a",
    border: "1px solid #bbf7d0",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#334155",
  },
  input: {
    padding: "10px 12px",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    fontSize: "14px",
    fontFamily: "inherit",
    transition: "border-color 0.3s ease",
    outline: "none",
  },
  buttonGroup: {
    display: "flex",
    gap: "12px",
    marginTop: "10px",
  },
  submitBtn: {
    flex: 1,
    padding: "12px 20px",
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  cancelBtn: {
    flex: 1,
    padding: "12px 20px",
    backgroundColor: "#e2e8f0",
    color: "#334155",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default NewUser;
