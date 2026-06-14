const express = require('express');
const router = express.Router();

const {
  getAllRoutes,
  getRouteById,
  getScheduleById,
  searchRoutes
} = require('../controllers/busRoutesController');

router.get('/', getAllRoutes);
router.get('/search', searchRoutes);
router.get('/schedule/:id', getScheduleById);
router.get('/:id', getRouteById);

module.exports = router;