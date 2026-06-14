import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [passengers, setPassengers] = useState([{ name: "", age: "" }]);
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("Economy");

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await api.get(`/routes/schedule/${id}`);
        setSchedule(res.data.schedule);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load schedule");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [id]);

  const updatePassenger = (index, field, value) => {
    setPassengers((prev) => prev.map((passenger, i) => i === index ? { ...passenger, [field]: value } : passenger));
  };

  const addPassenger = () => {
    setPassengers((prev) => [...prev, { name: "", age: "" }]);
  };

  const removePassenger = (index) => {
    setPassengers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.id) {
      alert("Please login first");
      navigate("/login");
      setSubmitting(false);
      return;
    }

    const validPassengers = passengers.filter((p) => p.name.trim() !== "");
    if (validPassengers.length === 0) {
      setError("At least one passenger with a name is required");
      setSubmitting(false);
      return;
    }

    try {
      const res = await api.post("/bookings", {
        schedule_id: id,
        category,
        passengers: validPassengers,
      });

      navigate("/payment", { state: { booking: { ...schedule, ...res.data.booking } } });
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Booking Failed";
      setError(errorMsg);
      console.error(err);
      setSubmitting(false);
    }
  };

  if (loading) return (
    <>
      <Navbar />
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Loading...</h2>
      </div>
    </>
  );

  return (
    <>
      <Navbar />

      <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
        <h1>Book Your Ticket</h1>

        {schedule && (
          <div style={{ background: "#f8f9fa", padding: "24px", borderRadius: "16px", marginBottom: "30px", boxShadow: "0 15px 40px rgba(15,23,42,0.08)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
              <div>
                <p style={{ margin: 0, color: "#94a3b8" }}>Transport</p>
                <h2 style={{ margin: "8px 0" }}>{schedule.transport_mode.toUpperCase()} • {schedule.route_number}</h2>
                <p style={{ margin: 0, color: "#334155" }}>{schedule.source} → {schedule.destination}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ margin: 0, color: "#94a3b8" }}>Price per seat</p>
                <h2 style={{ margin: "8px 0", color: "#2563eb" }}>₹{schedule.price}</h2>
                <p style={{ margin: 0, color: "#334155" }}>Seats left: {schedule.available_seats}</p>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "18px", marginTop: "20px" }}>
              <div style={{ background: "white", padding: "18px", borderRadius: "14px" }}>
                <p style={{ margin: 0, color: "#94a3b8" }}>Departure</p>
                <p style={{ margin: "8px 0 0", color: "#0f172a" }}>{new Date(schedule.departure_time).toLocaleString()}</p>
              </div>
              <div style={{ background: "white", padding: "18px", borderRadius: "14px" }}>
                <p style={{ margin: 0, color: "#94a3b8" }}>Arrival</p>
                <p style={{ margin: "8px 0 0", color: "#0f172a" }}>{new Date(schedule.arrival_time).toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div style={{ background: "#ffe4e6", color: "#b91c1c", padding: "14px 18px", borderRadius: "12px", marginBottom: "20px" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "24px", display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <label style={{ flex: "1 1 220px" }}>
              <p style={{ marginBottom: "8px", color: "#475569" }}>Travel Class</p>
              <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: "100%", padding: "14px 16px", borderRadius: "14px", border: "1px solid #cbd5e1", fontSize: "16px" }}>
                <option>Economy</option>
                <option>Business</option>
                <option>Premium</option>
              </select>
            </label>
          </div>

          {passengers.map((passenger, index) => (
            <div key={index} style={{ background: "#fff", padding: "20px", borderRadius: "18px", border: "1px solid #e2e8f0", marginBottom: "18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h3 style={{ margin: 0, color: "#0f172a" }}>Passenger {index + 1}</h3>
                {passengers.length > 1 && (
                  <button type="button" onClick={() => removePassenger(index)} style={{ border: "none", background: "#f87171", color: "white", padding: "8px 14px", borderRadius: "12px", cursor: "pointer" }}>
                    Remove
                  </button>
                )}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
                <input
                  value={passenger.name}
                  onChange={(e) => updatePassenger(index, "name", e.target.value)}
                  placeholder="Name"
                  style={{ width: "100%", padding: "14px 16px", borderRadius: "14px", border: "1px solid #cbd5e1", fontSize: "16px" }}
                  required
                />
                <input
                  type="number"
                  value={passenger.age}
                  onChange={(e) => updatePassenger(index, "age", e.target.value)}
                  placeholder="Age"
                  style={{ width: "100%", padding: "14px 16px", borderRadius: "14px", border: "1px solid #cbd5e1", fontSize: "16px" }}
                />
              </div>
            </div>
          ))}

          <button type="button" onClick={addPassenger} style={{ marginBottom: "24px", display: "inline-flex", alignItems: "center", gap: "10px", background: "#2563eb", color: "white", padding: "14px 20px", borderRadius: "14px", border: "none", cursor: "pointer" }}>
            + Add Passenger
          </button>

          <button
            type="submit"
            disabled={submitting || !schedule}
            style={{
              width: "100%",
              padding: "16px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "16px",
              cursor: submitting || !schedule ? "not-allowed" : "pointer",
              fontSize: "18px",
              fontWeight: 700,
            }}
          >
            {submitting ? "Preparing payment..." : "Continue to Payment"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Booking;