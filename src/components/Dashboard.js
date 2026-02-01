import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LeftNav from "./LeftNav";   // ✅ left navigation
import Footer from "./Footer";     // ✅ footer component

const Dashboard = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false); // dropdown
  const [user, setUser] = useState(null);  // ✅ fetch user from backend

  useEffect(() => {
    fetch("http://localhost:8081/api/users/profile", {  // ✅ corrected endpoint
      credentials: "include", // ensures cookies/session are sent
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
                src={`https://ui-avatars.com/api/?name=${user?.firstName || "User"}`}
                alt="profile"
                style={styles.avatar}
              />
              <span>{user?.firstName || "User"}</span>
            </div>

            {open && (
              <div style={styles.dropdown}>
                <div
                  style={styles.item}
                  onClick={() => {
                    setOpen(false);
                    navigate("/profile"); // ✅ redirect to profile page
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
  item: {
    padding: "10px",
    cursor: "pointer",
    borderBottom: "1px solid #eee",
  },
};

export default Dashboard;