import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const generateTicketPDF = (ticket) => {
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.setTextColor(37, 99, 235);
  doc.text("BUS PASS CLOUD", 65, 20);

  doc.setFontSize(11);
  doc.setTextColor(100);

  doc.text(`Ticket No: ${ticket.ticket_number}`, 20, 40);
  doc.text(`Status: Confirmed`, 20, 50);

  doc.text(
    `Route: ${ticket.source} → ${ticket.destination}`,
    20,
    60
  );

  doc.text(
    `Transport: ${ticket.transport_mode.toUpperCase()}`,
    20,
    70
  );

  doc.text(
    `Departure: ${new Date(
      ticket.departure_time
    ).toLocaleString()}`,
    20,
    80
  );

  doc.text(
    `Arrival: ${new Date(
      ticket.arrival_time
    ).toLocaleString()}`,
    20,
    90
  );

  doc.text(
    `Category: ${ticket.category}`,
    20,
    100
  );

  autoTable(doc, {
    startY: 115,
    head: [["Passenger", "Age"]],
    body: ticket.passengers.map((p) => [
      p.name,
      p.age || "N/A",
    ]),
  });

  const total =
    ticket.price * ticket.passengers.length;

  doc.text(
    `Total Amount: ₹${total}`,
    20,
    doc.lastAutoTable.finalY + 15
  );

  doc.text(
    "Thank you for choosing Bus Pass Cloud",
    20,
    doc.lastAutoTable.finalY + 30
  );

  doc.save(
    `${ticket.ticket_number}.pdf`
  );
};

export default generateTicketPDF;