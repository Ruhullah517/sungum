// File: models/Room.js
const db = require('../config/database');

const Room = {
    create: async (data) => {
        const query = 'INSERT INTO rooms (name, number, price, description, capacity, images) VALUES (?, ?, ?, ?, ?, ?)';
        const [result] = await db.query(query, [data.name, data.number, data.price, data.description, data.capacity, data.images]);
        return result;
    },

    getAll: async () => {
        const [results] = await db.query('SELECT * FROM rooms');
        return results;
    },

    getById: async (id) => {
        const [results] = await db.query('SELECT * FROM rooms WHERE id = ?', [id]);
        return results;
    },

    update: async (id, data) => {
        const query = 'UPDATE rooms SET name = ?, number = ?, price = ?, description = ?, capacity = ?, images = ? WHERE id = ?';
        const [result] = await db.query(query, [data.name, data.number, data.price, data.description, data.capacity, data.images, id]);
        return result;
    },

    delete: async (id) => {
        const [result] = await db.query('DELETE FROM rooms WHERE id = ?', [id]);
        return result;
    }
};

module.exports = Room;
