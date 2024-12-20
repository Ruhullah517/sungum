const Room = require('../models/roomModel');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

const createRoom = async (req, res) => {
    try {
        const images = req.files.map(file => file.path);
        const data = { ...req.body, images: JSON.stringify(images) };
        const result = await Room.create(data);
        res.status(201).json({ message: 'Room created successfully', roomId: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create room' });
    }
};

const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.getAll();
        res.status(200).json(rooms);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch rooms' });
    }
};

const getRoomById = async (req, res) => {
    try {
        const { id } = req.params;
        const rooms = await Room.getById(id);
        if (rooms.length === 0) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.status(200).json(rooms[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch room' });
    }
};

const updateRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const images = req.files ? req.files.map(file => file.path) : [];
        const data = { ...req.body, images: JSON.stringify(images) };
        await Room.update(id, data);
        res.status(200).json({ message: 'Room updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update room' });
    }
};

const deleteRoom = async (req, res) => {
    try {
        const { id } = req.params;
        await Room.delete(id);
        res.status(200).json({ message: 'Room deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete room' });
    }
};

module.exports = {
    createRoom,
    getAllRooms,
    getRoomById,
    updateRoom,
    deleteRoom,
    upload
};
