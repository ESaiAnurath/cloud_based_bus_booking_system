const express = require('express');
const router = express.Router();
const { bookTicket, getMyTickets, getTicketById } = require('../controllers/bookingController');
const protect = require('../middleware/auth');

// All booking routes require login
router.post('/', protect, bookTicket);
router.get('/my-tickets', protect, getMyTickets);
router.get('/ticket/:id', protect, getTicketById);

module.exports = router;
