import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (!user.id) {
          navigate("/login");
          return;
        }

        const res = await api.get("/bookings/my-tickets");
        setBookings(res.data.tickets || []);
      } catch (err) {
        const errorMsg = err.response?.data?.error || "Failed to load bookings";
        setError(errorMsg);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  if (loading)
    return (
      <>
        <Navbar />
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h2>Loading your bookings...</h2>
        </div>
      </>
    );

  return (
    <>
      <Navbar />

      <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
        <h1>My Bookings</h1>

        {error && (
          <div
            style={{
              background: "#fee",
              color: "#c33",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "15px",
            }}
          >
            {error}
          </div>
        )}

        {bookings.length === 0 ? (
          <div
            style={{
              background: "#f8f9fa",
              padding: "30px",
              textAlign: "center",
              borderRadius: "8px",
              marginTop: "20px",
            }}
          >
            <p>No bookings found. <a href="/search">Book a ticket now</a></p>
          </div>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking.id}
              style={{
                border: "1px solid #ddd",
                padding: "20px",
                marginBottom: "20px",
                borderRadius: "8px",
                background: "#fff",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                <h3>{booking.route_number}</h3>
                <span
                  style={{
                    background: "#22c55e",
                    color: "white",
                    padding: "5px 15px",
                    borderRadius: "20px",
                    fontSize: "0.9rem",
                  }}
                >
                  {booking.status}
                </span>
              </div>

              <p>
                <strong>Route:</strong> {booking.source} → {booking.destination}
              </p>
              <p>
                <strong>Passenger:</strong> {booking.passenger_name}
              </p>
              {booking.passenger_age && (
                <p>
                  <strong>Age:</strong> {booking.passenger_age}
                </p>
              )}
              <p>
                <strong>Ticket No:</strong> {booking.ticket_number}
              </p>
              <p>
                <strong>Departure:</strong>{" "}
                {new Date(booking.departure_time).toLocaleString()}
              </p>
              <p>
                <strong>Arrival:</strong>{" "}
                {new Date(booking.arrival_time).toLocaleString()}
              </p>
              <p>
                <strong>Price:</strong> ₹{booking.price}
              </p>
              <p style={{ fontSize: "0.9rem", color: "#666" }}>
                Booked on: {new Date(booking.created_at).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default MyBookings;