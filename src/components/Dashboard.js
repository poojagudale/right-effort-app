import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserProfile from "./UserProfile"; // ✅ import your profile component
import LeftNav from "./LeftNav"; // ✅ import left navigation
import Footer from "./Footer"; // ✅ import footer component

const Dashboard = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false); // dropdown
  const [showProfilePopup, setShowProfilePopup] = useState(false); // profile modal
  const [user, setUser] = useState(null); // ✅ fetch user from backend

  useEffect(() => {
    fetch("http://localhost:8081/api/user/profile", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Error fetching dashboard user:", err));
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      {/* 🔹 Left Navigation */}
      <LeftNav />

      {/* 🔹 Main Content Area */}
      <div style={styles.mainContent}>
        {/* 🔹 Top Bar */}
        <div style={styles.topBar}>
          <h3 style={{ margin: 0 }}>MyProject</h3>

          <div style={styles.profileWrapper}>
            <div style={styles.profile} onClick={() => setOpen(!open)}>
              <img
                src={`https://ui-avatars.com/api/?name=${user?.name || "User"}`}
                alt="profile"
                style={styles.avatar}
              />
              <span>{user?.name || "User"}</span>
            </div>

            {open && (
              <div style={styles.dropdown}>
                <div
                  style={styles.item}
                  onClick={() => {
                    setOpen(false);
                    setShowProfilePopup(true); // ✅ show popup
                  }}
                >
                  Profile
                </div>
                <div style={styles.item} onClick={logout}>
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 🔹 Main Content */}
        <div style={styles.contentArea}>
          {!user ? (
            <h1>Loading...</h1>
          ) : user.role && user.role.toUpperCase().includes("ADMIN") ? (
            <h1>Welcome Admin 👑</h1>
          ) : (
            <h1>Welcome User</h1>
          )}
        </div>

        {/* 🔹 Footer */}
        <Footer />
      </div>

      {/* 🔹 Profile Popup */}
      {showProfilePopup && (
        <div style={styles.overlay}>
          <div style={styles.popup}>
            <UserProfile /> {/* ✅ reuse actual profile component */}
            <button
              style={styles.closeBtn}
              onClick={() => setShowProfilePopup(false)}
            >
              ✖ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#f8fafc",
  },
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  topBar: {
    height: "60px",
    backgroundColor: "#1e293b",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    borderBottom: "1px solid #e2e8f0",
  },
  contentArea: {
    flex: 1,
    padding: "30px",
    overflowY: "auto",
  },
  profileWrapper: { position: "relative" },
  profile: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
  },
  avatar: { width: "34px", height: "34px", borderRadius: "50%" },
  dropdown: {
    position: "absolute",
    right: 0,
    top: "45px",
    backgroundColor: "#fff",
    color: "#000",
    borderRadius: "6px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    width: "130px",
    overflow: "hidden",
    zIndex: 1000,
  },
  item: { padding: "10px", cursor: "pointer", borderBottom: "1px solid #eee" },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },
  popup: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "20px",
    width: "500px",
    maxWidth: "90%",
    textAlign: "center",
    boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
  },
  closeBtn: {
    marginTop: "20px",
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "8px 12px",
    cursor: "pointer",
  },
};

export default Dashboard;