import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LeftNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", path: "/dashboard", icon: "📊" },
    { label: "New User", path: "/new-user", icon: "👥" },
    { label: "Profile", path: "/profile", icon: "👤" },
    { label: "Settings", path: "/settings", icon: "⚙️" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div style={styles.sidebar}>
      <div style={styles.header}>
        <h2 style={styles.title}>Menu</h2>
      </div>

      <nav style={styles.nav}>
        {menuItems.map((item) => (
          <div
            key={item.path}
            style={{
              ...styles.menuItem,
              ...(isActive(item.path) && styles.menuItemActive),
            }}
            onClick={() => navigate(item.path)}
          >
            <span style={styles.icon}>{item.icon}</span>
            <span style={styles.label}>{item.label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "250px",
    height: "100%",
    backgroundColor: "#0f172a",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  header: {
    padding: "20px",
    borderBottom: "1px solid #1e293b",
  },
  title: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "600",
  },
  nav: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "15px",
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 15px",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    color: "#cbd5e1",
  },
  menuItemActive: {
    backgroundColor: "#3b82f6",
    color: "#fff",
    fontWeight: "600",
  },
  icon: {
    fontSize: "18px",
    minWidth: "24px",
  },
  label: {
    fontSize: "14px",
  },
};

export default LeftNav;
