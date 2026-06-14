import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import generateTicketPDF from "../utils/generateTicketPDF";
function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;
const shareTicket = async () => {
  try {
    if (navigator.share) {
      await navigator.share({
        title: "Bus Pass Cloud Ticket",
        text: `My booking ${booking.ticket_number}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Ticket link copied!");
    }
  } catch (err) {
    console.error(err);
  }
};
  useEffect(() => {
    if (!booking) {
      navigate("/search");
    }
  }, [booking, navigate]);

  if (!booking) return null;

  return (
    <>
      <Navbar />
      <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ background: "url('https://images.unsplash.com/photo-1519337265831-281ec6cc8514?auto=format&fit=crop&w=1450&q=80') center/cover", borderRadius: "24px", padding: "40px", color: "white", textAlign: "center", marginBottom: "30px" }}>
          <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>Booking Confirmed!</h1>
          <p style={{ fontSize: "1.1rem", marginBottom: "0" }}>Your ticket has been confirmed successfully.</p>
        </div>

        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "300px", background: "#111827", color: "white", borderRadius: "20px", padding: "25px", boxShadow: "0 20px 50px rgba(0,0,0,0.25)" }}>
            <h2 style={{ marginBottom: "15px", color: "#fbbf24" }}>Ticket Summary</h2>
            <p><strong>Ticket No:</strong> {booking.ticket_number}</p>
            <p><strong>Route:</strong> {booking.source} → {booking.destination}</p>
            <p><strong>Transport:</strong> {booking.transport_mode}</p>
            <p><strong>Departure:</strong> {new Date(booking.departure_time).toLocaleString()}</p>
            <p><strong>Arrival:</strong> {new Date(booking.arrival_time).toLocaleString()}</p>
            <p><strong>Category:</strong> {booking.category}</p>
            <p><strong>Total Passengers:</strong> {booking.passengers.length}</p>
            <p><strong>Total Paid:</strong> ₹{booking.price * booking.passengers.length}</p>
          </div>

          <div style={{ flex: 1, minWidth: "300px", background: "#f8fafc", padding: "25px", borderRadius: "20px", boxShadow: "0 20px 50px rgba(0,0,0,0.1)" }}>
            <h2 style={{ marginBottom: "15px" }}>Passenger Details</h2>
            {booking.passengers.map((p, index) => (
              <div key={index} style={{ marginBottom: "15px", padding: "15px", background: "white", borderRadius: "12px" }}>
                <p><strong>{p.name}</strong></p>
                <p>Age: {p.age || "N/A"}</p>
              </div>
            ))}
            <button
              style={{
                width: "100%",
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "12px",
                padding: "15px",
                cursor: "pointer",
                marginBottom: "15px",
              }}
              onClick={() => generateTicketPDF(booking)}
            >
              Download Ticket
            </button>
            <button
              style={{
                width: "100%",
                background: "#22c55e",
                color: "white",
                border: "none",
                borderRadius: "12px",
                padding: "15px",
                cursor: "pointer",
              }}
              
              onClick={shareTicket}
            >
              Share Ticket
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Confirmation;
