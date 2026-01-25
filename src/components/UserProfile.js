import React, { useEffect, useState } from "react";

function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8081/api/user/profile", {
      credentials: "include", // 🔑 send session cookie
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch((err) => console.error("Error fetching profile:", err));
  }, []);

  if (!user) return <h2>Loading...</h2>;

  return (
    <div>
      <img
        src={
          user.picture
            ? user.picture
            : `https://ui-avatars.com/api/?name=${user.name || "User"}`
        }
        alt="profile"
        style={{ width: "80px", borderRadius: "50%" }}
      />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p>Role: {user.role}</p>
      <p>Provider: {user.provider}</p>
    </div>
  );
}

export default UserProfile;