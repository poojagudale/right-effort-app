import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // clear auth (token / session)
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={styles.navbar}>
      <h3 style={styles.logo}>MyProject</h3>

      <div style={styles.profile} onClick={() => navigate("/profile")}>
        <img
          src="https://ui-avatars.com/api/?name=User"
          alt="profile"
          style={styles.avatar}
        />
        <span style={styles.name}>Profile</span>
      </div>
    </div>
  );
};

const styles = {
  navbar: {
    height: "60px",
    background: "#1e293b",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px"
  },
  logo: {
    margin: 0
  },
  profile: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer"
  },
  avatar: {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    marginRight: "8px"
  },
  name: {
    fontSize: "14px"
  }
};

export default Navbar;
