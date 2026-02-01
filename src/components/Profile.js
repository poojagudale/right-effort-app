import React, { useEffect, useState } from "react";
import { getUserProfile, updateUserByEmail } from "../api/userService";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getUserProfile();
        setUser(res.data);
      } catch (error) {
        setMessage("❌ Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSave = async () => {
  // ✅ Simple validation before sending request
  if (!user.firstName?.trim() || !user.lastName?.trim()) {
    setMessage("❌ First name and Last name are required");
    return;
  }
  if (user.mobileNo && user.mobileNo.length < 10) {
    setMessage("❌ Mobile number must be at least 10 digits");
    return;
  }

  try {
    const res = await updateUserByEmail(user);
    setMessage(res.data.message || "✅ Profile updated successfully!");
    setEditing(false);

    // ✅ Refresh profile from backend after successful save
    const refreshed = await getUserProfile();
    setUser(refreshed.data);
  } catch (error) {
    // ✅ Show error but DO NOT overwrite state with empty values
    setMessage(error.response?.data?.message || "❌ Failed to update profile");
    setEditing(false);
    // 🔹 Keep existing user state so cleared fields don't disappear
  }
};
  if (loading) return <div style={styles.page}><p>Loading profile...</p></div>;
  if (!user) return <div style={styles.page}><p>No profile data found</p></div>;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>My Profile</h1>
        {message && <p style={styles.message}>{message}</p>}

        <div style={styles.profileCard}>
          <img
            src={user.picture || "https://via.placeholder.com/150"}
            alt="Profile"
            style={styles.avatar}
          />

          {!editing ? (
            <div style={styles.info}>
            
              <p><span style={styles.label}>First Name:</span> {user.firstName}</p>
              <p><span style={styles.label}>Last Name:</span> {user.lastName}</p>
              <p><span style={styles.label}>Email:</span> {user.email}</p>
              <p><span style={styles.label}>Mobile No:</span> {user.mobileNo}</p>
            </div>
          ) : (
            <form style={styles.form}>
              <label style={styles.label}>First Name:</label>
              <input type="text" name="firstName" value={user.firstName || ""} onChange={handleChange} />

              <label style={styles.label}>Last Name:</label>
              <input type="text" name="lastName" value={user.lastName || ""} onChange={handleChange} />

              <label style={styles.label}>Email:</label>
              <input type="text" name="email" value={user.email || ""} onChange={handleChange} />

              <label style={styles.label}>Mobile No:</label>
              <input type="text" name="mobileNo" value={user.mobileNo || ""} onChange={handleChange} />
            </form>
          )}

          <div style={styles.actions}>
            {editing ? (
              <>
                <button onClick={handleSave} style={styles.saveBtn}>Save</button>
                <button
                    onClick={async () => {
                    const refreshed = await getUserProfile(); // 🔄 reload from backend
                    setUser(refreshed.data);                  // ✅ restore original values
                    setEditing(false);                        // exit edit mode
                    setMessage("");                           // clear any error
         }}
  style={styles.cancelBtn}
>
  Cancel
</button>
              </>
            ) : (
              <button onClick={() => setEditing(true)} style={styles.editBtn}>Edit</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f1f5f9",
    padding: "20px",
  },
  container: {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
  },
  message: {
    marginBottom: "10px",
    color: "green",
    textAlign: "center",
  },
  profileCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  },
  avatar: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  info: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    fontSize: "16px",
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  label: {
    fontWeight: "bold",
    marginRight: "8px",
  },
  actions: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  editBtn: {
    background: "#3b82f6",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  saveBtn: {
    background: "#16a34a",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  cancelBtn: {
    background: "#e2e8f0",
    color: "#334155",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Profile;