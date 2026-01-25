import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <div style={styles.content}>
        <div style={styles.section}>
          <h4 style={styles.heading}>MyProject</h4>
          <p style={styles.text}>
            A secure authentication and user management platform.
          </p>
        </div>

        <div style={styles.section}>
          <h4 style={styles.heading}>Quick Links</h4>
          <ul style={styles.list}>
            <li>
              <a href="/dashboard" style={styles.link}>
                Dashboard
              </a>
            </li>
            <li>
              <a href="/profile" style={styles.link}>
                Profile
              </a>
            </li>
            <li>
              <a href="/settings" style={styles.link}>
                Settings
              </a>
            </li>
          </ul>
        </div>

        <div style={styles.section}>
          <h4 style={styles.heading}>Contact</h4>
          <p style={styles.text}>Email: support@myproject.com</p>
          <p style={styles.text}>Phone: +1 (555) 123-4567</p>
        </div>
      </div>

      <div style={styles.divider}></div>

      <div style={styles.bottom}>
        <p style={styles.copyright}>
          &copy; {currentYear} MyProject. All rights reserved.
        </p>
        <div style={styles.links}>
          <a href="#privacy" style={styles.link}>
            Privacy Policy
          </a>
          <span style={styles.separator}>•</span>
          <a href="#terms" style={styles.link}>
            Terms of Service
          </a>
          <span style={styles.separator}>•</span>
          <a href="#cookies" style={styles.link}>
            Cookie Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#0f172a",
    color: "#cbd5e1",
    padding: "40px 20px 20px",
    borderTop: "1px solid #1e293b",
    fontSize: "14px",
  },
  content: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "30px",
    maxWidth: "1200px",
    margin: "0 auto 30px",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  heading: {
    color: "#f1f5f9",
    fontSize: "16px",
    fontWeight: "600",
    margin: "0 0 10px 0",
  },
  text: {
    margin: "0",
    lineHeight: "1.6",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  link: {
    color: "#cbd5e1",
    textDecoration: "none",
    transition: "color 0.3s ease",
  },
  divider: {
    height: "1px",
    backgroundColor: "#1e293b",
    margin: "20px 0",
    maxWidth: "1200px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  bottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1200px",
    margin: "0 auto",
    flexWrap: "wrap",
    gap: "15px",
  },
  copyright: {
    margin: 0,
    color: "#94a3b8",
  },
  links: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  separator: {
    color: "#475569",
  },
};

export default Footer;
