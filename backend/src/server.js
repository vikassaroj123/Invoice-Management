const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const cors = require('cors'); // Import cors
require('dotenv').config();

const app = express();

// Connect to the database
connectDB().catch(err => {
    console.error(`Failed to connect to the database: ${err.message}`);
    process.exit(1); // Exit the process with failure
});

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/invoices', invoiceRoutes);

// Define port
const PORT = process.env.PORT || 5006; // Use a different port to avoid conflicts

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

// Handle server errors
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use.`);
    } else {
        console.error(`Server error: ${err.message}`);
    }
    process.exit(1); // Exit the process with failure
});

module.exports = app;
