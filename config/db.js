const mongoose = require("mongoose");

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.warn(`[WARNING] MONGO_URI is not defined in environment. Express server will run in offline mock data mode.`);
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.warn(`[WARNING] Failed to connect to MongoDB. Continuing server execution in offline mock data mode.`);
  }
};

module.exports = connectDB;