import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  // Get booking directly from router state
  const booking = location.state?.booking;

  useEffect(() => {
    if (!booking) {
      navigate("/search");
    }
  }, [booking, navigate]);

  const handlePay = () => {
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);

      navigate("/confirmation", {
        state: {
          booking: {
            ...booking,
            paymentMethod,
          },
        },
      });
    }, 1500);
  };

  if (!booking) return null;

  const totalAmount =
    booking.price * booking.passengers.length;

  return (
    <>
      <Navbar />

      <div
        style={{
          padding: "40px",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <h1>💳 Secure Payment</h1>

          <p
            style={{
              color: "#64748b",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            Review your booking and complete payment securely.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          {/* Ticket Preview */}
          <div
            style={{
              background: "#111827",
              color: "white",
              padding: "25px",
              borderRadius: "20px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
            }}
          >
            <h2
              style={{
                color: "#fbbf24",
                marginBottom: "20px",
              }}
            >
              🎫 Ticket Preview
            </h2>

            <p>
              <strong>Ticket No:</strong>{" "}
              {booking.ticket_number}
            </p>

            <p>
              <strong>Transport:</strong>{" "}
              {booking.transport_mode?.toUpperCase()}
            </p>

            <p>
              <strong>Route:</strong>{" "}
              {booking.source} → {booking.destination}
            </p>

            <p>
              <strong>Departure:</strong>{" "}
              {new Date(
                booking.departure_time
              ).toLocaleString()}
            </p>

            <p>
              <strong>Arrival:</strong>{" "}
              {new Date(
                booking.arrival_time
              ).toLocaleString()}
            </p>

            <p>
              <strong>Category:</strong>{" "}
              {booking.category}
            </p>

            <p>
              <strong>Passengers:</strong>{" "}
              {booking.passengers.length}
            </p>

            <hr
              style={{
                margin: "15px 0",
                borderColor: "#374151",
              }}
            />

            <h2 style={{ color: "#22c55e" }}>
              Total: ₹{totalAmount}
            </h2>
          </div>

          {/* Payment Section */}
          <div
            style={{
              background: "#ffffff",
              padding: "25px",
              borderRadius: "20px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ marginBottom: "20px" }}>
              Select Payment Method
            </h2>

            <select
              value={paymentMethod}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                border: "1px solid #cbd5e1",
                marginBottom: "20px",
                fontSize: "16px",
              }}
            >
              <option value="UPI">UPI</option>
              <option value="Credit Card">
                Credit Card
              </option>
              <option value="Debit Card">
                Debit Card
              </option>
              <option value="Net Banking">
                Net Banking
              </option>
            </select>

            <button
              onClick={handlePay}
              disabled={processing}
              style={{
                width: "100%",
                background: "#2563eb",
                color: "white",
                border: "none",
                padding: "15px",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: processing
                  ? "not-allowed"
                  : "pointer",
              }}
            >
              {processing
                ? "Processing Payment..."
                : `Pay ₹${totalAmount}`}
            </button>

            <div
              style={{
                marginTop: "20px",
                color: "#475569",
              }}
            >
              <p>✅ Secure Payment Gateway</p>
              <p>💳 Visa, Mastercard, UPI</p>
              <p>🔒 End-to-End Encryption</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;