require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const seedAdmin = require('./utils/seedAdmin');

// Import routes
const authRoutes = require('./routes/authRoutes');
const designRoutes = require('./routes/designRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');

const app = express();

// Connect to MongoDB, then seed admin
connectDB().then(() => seedAdmin());

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/designs', designRoutes);
app.use('/api/enquiries', enquiryRoutes);

// Health check
app.get('/', (req, res) => res.json({ message: 'Parnika Interiors API is running 🏠' }));

// 404 handler
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
