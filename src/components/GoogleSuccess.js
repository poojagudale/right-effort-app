import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GoogleSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8081/api/user/profile", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("name", data.name);
        localStorage.setItem("email", data.email);
        localStorage.setItem("role", data.role);
        localStorage.setItem("provider", data.provider);
        if (data.picture) localStorage.setItem("picture", data.picture);

        navigate("/dashboard");
      })
      .catch(() => navigate("/login"));
  }, [navigate]);

  return <h2>Logging you in...</h2>;
}