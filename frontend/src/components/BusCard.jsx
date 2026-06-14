import { Link } from "react-router-dom";

function BusCard({ bus }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "24px",
        borderRadius: "18px",
        boxShadow: "0 15px 40px rgba(15,23,42,0.08)",
        marginBottom: "20px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "14px", marginBottom: "18px" }}>
        <div>
          <p style={{ margin: 0, color: "#64748b" }}>Route</p>
          <h2 style={{ margin: "8px 0 0" }}>{bus.route_number}</h2>
          <p style={{ margin: "8px 0 0", color: "#475569" }}>{bus.source} → {bus.destination}</p>
        </div>
        <span style={{ padding: "6px 14px", borderRadius: "999px", background: "#eff6ff", color: "#1d4ed8", fontWeight: 700, textTransform: "uppercase", fontSize: "0.75rem" }}>
          {bus.transport_mode}
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "12px", marginBottom: "18px" }}>
        <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "16px" }}>
          <p style={{ margin: 0, color: "#64748b", fontSize: "0.9rem" }}>Departure</p>
          <p style={{ margin: "10px 0 0", fontWeight: 700 }}>{new Date(bus.departure_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
        <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "16px" }}>
          <p style={{ margin: 0, color: "#64748b", fontSize: "0.9rem" }}>Arrival</p>
          <p style={{ margin: "10px 0 0", fontWeight: 700 }}>{new Date(bus.arrival_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
      </div>

      <p style={{ margin: "0 0 8px", color: "#475569" }}><strong>Distance:</strong> {bus.distance_km} KM</p>
      <p style={{ margin: "0 0 16px", color: "#475569" }}><strong>Seats available:</strong> {bus.available_seats}</p>
      <p style={{ margin: "0 0 20px", fontSize: "1.3rem", fontWeight: 800, color: "#111827" }}>₹{bus.price}</p>

      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
        <Link to={`/booking/${bus.schedule_id}`} style={{ textDecoration: "none" }}>
          <button
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "14px",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            Book Now
          </button>
        </Link>

        <span style={{ color: "#64748b", fontSize: "0.9rem" }}>{bus.transport_mode} Service</span>
      </div>
    </div>
  );
}

export default BusCard;