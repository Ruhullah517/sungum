const Event = require('../models/eventModel');
const multer = require('multer');
const path = require('path');

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Accept images only
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = 'Only image files are allowed!';
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
}).array('images', 5); // Allow up to 5 images

const createEvent = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ error: err.message || 'Error uploading files' });
            }

            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ error: 'Please upload at least one image' });
            }

            const images = req.files.map(file => file.path);
            const eventData = { ...req.body, images: JSON.stringify(images) };
            const result = await Event.create(eventData);
            res.status(201).json({ message: 'Event created successfully', eventId: result.insertId });
        });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Failed to create event' });
    }
};

const getAllEvents = async (req, res) => {
    try {
        const events = await Event.getAll();
        res.status(200).json(events);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
};

const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const events = await Event.getById(id);
        if (events.length === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(events[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch event' });
    }
};

const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const existingEvent = await Event.getById(id);
        if (existingEvent.length === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }

        let images;
        if (req.files && req.files.length > 0) {
            images = req.files.map(file => file.path);
        } else {
            images = JSON.parse(existingEvent[0].images || '[]');
        }

        const data = { ...req.body, images: JSON.stringify(images) };
        await Event.update(id, data);
        res.status(200).json({ message: 'Event updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update event' });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        await Event.delete(id);
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete event' });
    }
};

const checkEventAvailability = async (req, res) => {
    const { date, time } = req.body;
    console.log(date, time);

    // Validate input
    if (!date || !time) {
        return res.status(500).json({ error: 'date and time are required' });
    }

    // Validate time
    const validTimes = ['Morning', 'Evening'];
    if (!validTimes.includes(time)) {
        return res.status(400).json({ error: 'Time must be Morning or Evening' });
    }

    try {
        // Check availability through the model
        const isAvailable = await Event.isEventAvailable(date, time);
        return res.status(200).json({ available: isAvailable });
    } catch (error) {
        console.error('Error checking event availability:', error);
        return res.status(500).json({ error: 'Failed to check event availability' });;
    }
};

module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    upload,
    checkEventAvailability
};