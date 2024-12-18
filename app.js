const express = require('express');
const cors = require('cors');
const http = require('http');
const userRoutes = require('./src/routes/userRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');
const staffRoutes = require('./src/routes/staffRoutes');
const menuRoutes = require('./src/routes/menuRoutes');
const galleryRoutes = require('./src/routes/galleryRoutes');
const incomeRoutes = require('./src/routes/incomeRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');
// const { setupWebSocket } = require('./src/config/webSocket');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/income', incomeRoutes)
app.use('/api/notifications', notificationRoutes)

// Create HTTP server and setup WebSocket
// const server = http.createServer(app);
// setupWebSocket(server);

module.exports = app;