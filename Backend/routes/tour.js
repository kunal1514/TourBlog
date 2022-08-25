const express = require('express');
const router = express.Router();
const { addTour, getTours, getTour, getToursByUsers } = require('../controllers/tour.js');
const { auth } = require('../middlewares/auth');

router.post("/createTour", auth, addTour);
router.get("/getTours", getTours);
router.get("/getTour/:id", getTour);
router.get("/getToursByUsers/:id", auth, getToursByUsers);

module.exports = router;