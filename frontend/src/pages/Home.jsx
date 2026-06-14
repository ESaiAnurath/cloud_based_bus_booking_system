import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f8fafc",
          padding: "20px",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "800px" }}>
          <h1
            style={{
              fontSize: "3rem",
              color: "#1e293b",
              marginBottom: "20px",
            }}
          >
            Cloud-Based Travel Booking
          </h1>

          <p
            style={{
              fontSize: "1.2rem",
              color: "#64748b",
              marginBottom: "30px",
            }}
          >
            Book buses, trains, and flights with secure checkout, passenger management, and ticket preview.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              marginBottom: "40px",
            }}
          >
            <Link to="/search">
              <button
                style={{
                  padding: "12px 25px",
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Search Travel
              </button>
            </Link>

            <Link to="/login">
              <button
                style={{
                  padding: "12px 25px",
                  border: "1px solid #2563eb",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Login
              </button>
            </Link>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "30px",
              flexWrap: "wrap",
            }}
          >
            <div>☁️ Cloud Hosted</div>
            <div>🔒 Secure Booking</div>
            <div>⚡ Fast Performance</div>
            <div>📈 Highly Scalable</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;