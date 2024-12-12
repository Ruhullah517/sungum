const RoomPayment = require('../models/roomPaymentModel');
const EventPayment = require('../models/eventPaymentModel');

exports.getRoomPayments = async (req, res) => {
  try {
    const payments = await RoomPayment.getAll();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEventPayments = async (req, res) => {
  try {
    const payments = await EventPayment.getAll();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRoomPayment = async (req, res) => {
  try {
    const paymentId = req.params.id;
    await RoomPayment.update(paymentId, req.body);
    res.status(200).json({ message: 'Room payment updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEventPayment = async (req, res) => {
  try {
    const paymentId = req.params.id;
    await EventPayment.update(paymentId, req.body);
    res.status(200).json({ message: 'Event payment updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
