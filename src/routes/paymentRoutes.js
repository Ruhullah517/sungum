const express = require('express');
const router = express.Router();
const {
  getRoomPayments,
  getEventPayments,
  updateRoomPayment,
  updateEventPayment,
} = require('../controllers/paymentController');

router.get('/rooms', getRoomPayments);
router.get('/events', getEventPayments);

router.put('/rooms/:id', updateRoomPayment); 
router.put('/events/:id', updateEventPayment);

module.exports = router;
