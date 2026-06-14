const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

// POST /api/bookings
exports.bookTicket = async (req, res) => {
  const { schedule_id, category, passengers } = req.body;
  const user_id = req.user.id;

  if (!schedule_id || !Array.isArray(passengers) || passengers.length === 0) {
    return res.status(400).json({ error: 'schedule_id and passenger list are required' });
  }

  const validPassengers = passengers.filter(
    (passenger) => passenger.name && passenger.name.trim().length > 0
  );
  if (validPassengers.length === 0) {
    return res.status(400).json({ error: 'At least one passenger is required' });
  }

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const [schedules] = await conn.query(
      'SELECT * FROM schedules WHERE id = ? FOR UPDATE',
      [schedule_id]
    );

    if (schedules.length === 0) {
      await conn.rollback();
      return res.status(404).json({ error: 'Schedule not found' });
    }

    const schedule = schedules[0];
    const passengerCount = validPassengers.length;

    if (schedule.available_seats < passengerCount) {
      await conn.rollback();
      return res.status(400).json({ error: 'Not enough seats available for the selected passengers' });
    }

    const [existing] = await conn.query(
      'SELECT id FROM bookings WHERE user_id = ? AND schedule_id = ?',
      [user_id, schedule_id]
    );
    if (existing.length > 0) {
      await conn.rollback();
      return res.status(409).json({ error: 'You already have a booking on this schedule' });
    }

    const ticket_number = 'TKT-' + uuidv4().split('-')[0].toUpperCase();

    const [booking] = await conn.query(
      `INSERT INTO bookings (user_id, schedule_id, passenger_name, passenger_age, passengers, category, ticket_number, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'confirmed')`,
      [
        user_id,
        schedule_id,
        validPassengers[0].name,
        validPassengers[0].age || null,
        JSON.stringify(validPassengers),
        category || 'Economy',
        ticket_number,
      ]
    );

    await conn.query(
      'UPDATE schedules SET available_seats = available_seats - ? WHERE id = ?',
      [passengerCount, schedule_id]
    );

    await conn.commit();

    res.status(201).json({
      message: 'Ticket booked successfully',
      booking: {
        id: booking.insertId,
        ticket_number,
        schedule_id,
        passengers: validPassengers,
        category: category || 'Economy',
        status: 'confirmed',
      },
    });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    conn.release();
  }
};

// GET /api/bookings/my-tickets
exports.getMyTickets = async (req, res) => {
  try {
    const [tickets] = await db.query(
      `SELECT b.id, b.ticket_number, b.passengers, b.category, b.status, b.created_at,
              r.route_number, r.source, r.destination, r.transport_mode,
              s.departure_time, s.arrival_time, s.price
       FROM bookings b
       JOIN schedules s ON s.id = b.schedule_id
       JOIN bus_routes r ON r.id = s.route_id
       WHERE b.user_id = ?
       ORDER BY b.created_at DESC`,
      [req.user.id]
    );
    res.json({ count: tickets.length, tickets });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/bookings/ticket/:id
exports.getTicketById = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT b.*, r.route_number, r.source, r.destination,
              s.departure_time, s.arrival_time, s.price
       FROM bookings b
       JOIN schedules s ON s.id = b.schedule_id
       JOIN bus_routes r ON r.id = s.route_id
       WHERE b.ticket_number = ? AND b.user_id = ?`,
      [req.params.id, req.user.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    res.json({ ticket: rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
