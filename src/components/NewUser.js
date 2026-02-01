import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserByEmail } from "../api/userService";  // ✅ use update API

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
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) return setError("First Name is required");
    if (!formData.lastName.trim()) return setError("Last Name is required");
    if (!formData.email.trim()) return setError("Email is required");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return setError("Invalid email format");
    if (!formData.mobileNo.trim()) return setError("Mobile Number is required");
    if (!/^\d{10,15}$/.test(formData.mobileNo.replace(/[-\s]/g, "")))
      return setError("Mobile number must be 10-15 digits");
    return true;
  };

  const setError = (text) => {
    setMessage({ type: "error", text });
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await updateUserByEmail(formData);  // ✅ update call
      setMessage({
        type: "success",
        text: res.data?.message || "User updated successfully!",
      });
      setFormData({ firstName: "", lastName: "", email: "", mobileNo: "" });
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to update user",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => navigate("/dashboard");

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <div style={styles.header}>
          <h1 style={styles.title}>Update User</h1>
          <p style={styles.subtitle}>Fill in the details to update user info</p>
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
            <button type="submit" style={styles.submitBtn} disabled={loading}>
              {loading ? "Updating..." : "Update User"}
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
  container: { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f8fafc", padding: "20px" },
  formWrapper: { backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)", padding: "40px", width: "100%", maxWidth: "500px" },
  header: { marginBottom: "30px", textAlign: "center" },
  title: { fontSize: "28px", fontWeight: "700", color: "#1e293b", margin: "0 0 10px 0" },
  subtitle: { fontSize: "14px", color: "#64748b", margin: 0 },
  message: { padding: "12px 16px", borderRadius: "6px", marginBottom: "20px", fontSize: "14px", fontWeight: "500" },
  messageError: { backgroundColor: "#fee2e2", color: "#dc2626", border: "1px solid #fecaca" },
  messageSuccess: { backgroundColor: "#dcfce7", color: "#16a34a", border: "1px solid #bbf7d0" },
  form: { display: "flex", flexDirection: "column", gap: "20px" },
  formGroup: { display: "flex", flexDirection: "column", gap: "8px" },
  label: { fontSize: "14px", fontWeight: "600", color: "#334155" },
  input: { padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "14px", fontFamily: "inherit", outline: "none" },
  buttonGroup: { display: "flex", gap: "12px", marginTop: "10px" },
  submitBtn: { flex: 1, padding: "12px 20px", backgroundColor: "#3b82f6", color: "#fff", border: "none", borderRadius: "6px", fontSize: "14px", fontWeight: "600", cursor: "pointer" },
  cancelBtn: { flex: 1, padding: "12px 20px", backgroundColor: "#e2e8f0", color: "#334155", border: "none", borderRadius: "6px", fontSize: "14px", fontWeight: "600", cursor: "pointer" },
};

export default NewUser;