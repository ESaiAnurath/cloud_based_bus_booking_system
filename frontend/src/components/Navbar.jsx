import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 50px",
        background: "#ffffff",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <h2 style={{ margin: 0 }}>🚌 BusPass Cloud</h2>
      </Link>

      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#2563eb" }}>
          Home
        </Link>
        <Link to="/search" style={{ textDecoration: "none", color: "#2563eb" }}>
          Search Travel
        </Link>

        {user ? (
          <>
            <Link to="/bookings" style={{ textDecoration: "none", color: "#2563eb" }}>
              My Bookings
            </Link>
            <span style={{ color: "#666" }}>Welcome, {user.name}</span>
            <button
              onClick={handleLogout}
              style={{
                background: "#dc2626",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ textDecoration: "none", color: "#2563eb" }}>
              Login
            </Link>
            <Link to="/register" style={{ textDecoration: "none", color: "#2563eb" }}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;