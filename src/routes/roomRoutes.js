const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

router.post('/', roomController.upload.array('images', 5), roomController.createRoom);
router.get('/', roomController.getAllRooms);
router.get('/:id', roomController.getRoomById);
router.put('/:id', roomController.upload.array('images', 5), roomController.updateRoom);
router.delete('/:id', roomController.deleteRoom);

module.exports = router;