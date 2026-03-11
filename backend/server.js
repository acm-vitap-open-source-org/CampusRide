// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

app.use(cors());
app.use(express.json());

// User model
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: { type: String, enum: ['renter', 'owner', 'admin'] },
  name: String
});
const User = mongoose.model('User', UserSchema);

// Bike model
const BikeSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  type: String,
  pricePerDay: Number,
  deposit: Number,
  availableDates: [Date],
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }]
});
const Bike = mongoose.model('Bike', BikeSchema);

// Basic routes
app.post('/api/register', async (req, res) => {
  // Hash password with bcrypt, save user
});

app.post('/api/login', async (req, res) => {
  // Verify credentials, return JWT
});

io.on('connection', (socket) => {
  socket.on('booking-request', (data) => {
    io.emit('new-booking', data); // Real-time notifications
  });
});

server.listen(5000);

