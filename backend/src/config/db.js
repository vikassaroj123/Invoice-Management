const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // Debugging: Print environment variable to ensure it's loaded
    console.log('MongoDB URI:', process.env.MONGO_URI);

    // Check if the environment variable is defined
    if (!process.env.MONGO_URI) {
      throw new Error('MongoDB URI is not defined in environment variables');
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected successfully.');
  } catch (err) {
    // Log the error message
    console.error('MongoDB connection error:', err.message);
    
    // Exit process with failure code
    process.exit(1);
  }
};

module.exports = connectDB;
