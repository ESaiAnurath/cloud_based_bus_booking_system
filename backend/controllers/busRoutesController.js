const db = require('../config/db');

// GET /api/routes
exports.getAllRoutes = async (req, res) => {
  try {
    const mode = req.query.mode;
    const filter = mode ? 'AND r.transport_mode = ?' : '';
    const params = mode ? [mode] : [];

    const [routes] = await db.query(
      `SELECT r.id, r.route_number, r.source, r.destination, r.transport_mode, r.distance_km,
              s.id as schedule_id, s.departure_time, s.arrival_time,
              s.price, s.total_seats, s.available_seats
       FROM bus_routes r
       JOIN schedules s ON s.route_id = r.id
       WHERE s.available_seats > 0 ${filter}
       ORDER BY s.departure_time`,
      params
    );
    res.json({ count: routes.length, routes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/routes/:id
exports.getRouteById = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT r.*, s.id as schedule_id, s.departure_time, s.arrival_time,
              s.price, s.total_seats, s.available_seats
       FROM bus_routes r
       JOIN schedules s ON s.route_id = r.id
       WHERE r.id = ?`,
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Route not found' });
    }
    res.json({ route: rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.searchRoutes = async (req, res) => {
  try {
    const { source, destination, mode } = req.query;

    const [routes] = await db.query(
      `SELECT r.id, r.route_number, r.source,
              r.destination, r.transport_mode,
              r.distance_km,
              s.id as schedule_id,
              s.departure_time,
              s.arrival_time,
              s.price,
              s.available_seats
       FROM bus_routes r
       JOIN schedules s ON s.route_id = r.id
       WHERE s.available_seats > 0
         AND r.source LIKE ?
         AND r.destination LIKE ?
         AND r.transport_mode = ?
       ORDER BY s.departure_time`,
      [`%${source}%`, `%${destination}%`, mode]
    );

    res.json({ routes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/routes/schedule/:id
exports.getScheduleById = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT r.id as route_id, r.route_number, r.source, r.destination, r.transport_mode, r.distance_km,
              s.id as schedule_id, s.departure_time, s.arrival_time, s.price, s.total_seats, s.available_seats
       FROM schedules s
       JOIN bus_routes r ON r.id = s.route_id
       WHERE s.id = ?`,
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Schedule not found' });
    }
    res.json({ schedule: rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
