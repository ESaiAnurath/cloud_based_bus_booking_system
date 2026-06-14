import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BusCard from "../components/BusCard";
import api from "../services/api";

const transportModes = [
  { key: "bus", label: "Telangana Buses" },
  { key: "train", label: "Popular Trains" },
  { key: "flight", label: "International Flights" },
];

const staticRoutes = {
  bus: [
    {
      schedule_id: 101,
      route_number: "BUS-TS1",
      source: "Hyderabad",
      destination: "Warangal",
      transport_mode: "bus",
      distance_km: 145,
      departure_time: "2026-06-14T06:30:00",
      arrival_time: "2026-06-14T09:30:00",
      price: 220,
      available_seats: 35,
    },
    {
      schedule_id: 102,
      route_number: "BUS-TS2",
      source: "Hyderabad",
      destination: "Vijayawada",
      transport_mode: "bus",
      distance_km: 275,
      departure_time: "2026-06-14T08:15:00",
      arrival_time: "2026-06-14T12:45:00",
      price: 390,
      available_seats: 28,
    },
    {
      schedule_id: 103,
      route_number: "BUS-TS3",
      source: "Hyderabad",
      destination: "Karimnagar",
      transport_mode: "bus",
      distance_km: 160,
      departure_time: "2026-06-14T10:00:00",
      arrival_time: "2026-06-14T12:30:00",
      price: 180,
      available_seats: 22,
    },
  ],
  train: [
    {
      schedule_id: 201,
      route_number: "TRN-CHN",
      source: "Hyderabad",
      destination: "Chennai",
      transport_mode: "train",
      distance_km: 710,
      departure_time: "2026-06-14T06:20:00",
      arrival_time: "2026-06-14T18:10:00",
      price: 850,
      available_seats: 45,
    },
    {
      schedule_id: 202,
      route_number: "TRN-MUM",
      source: "Hyderabad",
      destination: "Mumbai",
      transport_mode: "train",
      distance_km: 710,
      departure_time: "2026-06-14T07:00:00",
      arrival_time: "2026-06-14T20:00:00",
      price: 950,
      available_seats: 38,
    },
    {
      schedule_id: 203,
      route_number: "TRN-DEL",
      source: "Hyderabad",
      destination: "New Delhi",
      transport_mode: "train",
      distance_km: 1500,
      departure_time: "2026-06-14T05:45:00",
      arrival_time: "2026-06-15T06:20:00",
      price: 1400,
      available_seats: 55,
    },
  ],
  flight: [
    {
      schedule_id: 301,
      route_number: "FLT-DXB",
      source: "Hyderabad",
      destination: "Dubai",
      transport_mode: "flight",
      distance_km: 2900,
      departure_time: "2026-06-14T09:00:00",
      arrival_time: "2026-06-14T13:30:00",
      price: 5200,
      available_seats: 120,
    },
    {
      schedule_id: 302,
      route_number: "FLT-SIN",
      source: "Hyderabad",
      destination: "Singapore",
      transport_mode: "flight",
      distance_km: 3200,
      departure_time: "2026-06-14T11:00:00",
      arrival_time: "2026-06-14T16:00:00",
      price: 7200,
      available_seats: 95,
    },
    {
      schedule_id: 303,
      route_number: "FLT-LON",
      source: "Hyderabad",
      destination: "London",
      transport_mode: "flight",
      distance_km: 8400,
      departure_time: "2026-06-14T01:00:00",
      arrival_time: "2026-06-14T08:30:00",
      price: 18200,
      available_seats: 68,
    },
  ],
};

function SearchBus() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("bus");
  const [, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError("");

      try {
        const response = await api.get(`/routes?mode=${mode}`);
        if (mounted && Array.isArray(response.data.routes) && response.data.routes.length > 0) {
          setRoutes(response.data.routes);
        } else if (mounted) {
          setRoutes(staticRoutes[mode] || []);
          setError("Showing static route options for this transport mode.");
        }
      } catch (error) {
        console.error(error);
        if (mounted) {
          setRoutes(staticRoutes[mode] || []);
          setError("Failed to load live routes. Showing offline static options.");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [mode]);

  return (
    <>
      <Navbar />

      <div style={{ padding: "40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px", marginBottom: "24px" }}>
          <div>
            <h1>Travel Options</h1>
            <p style={{ color: "#64748b", maxWidth: "660px" }}>
              Select bus, train or flight and book the best option based on your route and passenger selection.
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {transportModes.map((option) => (
              <button
                key={option.key}
                onClick={() => setMode(option.key)}
                style={{
                  padding: "12px 24px",
                  borderRadius: "999px",
                  border: option.key === mode ? "2px solid #2563eb" : "1px solid #cbd5e1",
                  background: option.key === mode ? "#eff6ff" : "white",
                  color: option.key === mode ? "#1d4ed8" : "#334155",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <h2>Loading available routes...</h2>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            {routes.map((bus) => (
              <BusCard key={bus.schedule_id} bus={bus} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default SearchBus;