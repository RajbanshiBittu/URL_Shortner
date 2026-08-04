import mongoose from 'mongoose';

export const connectDB = async () => {

    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) throw new Error("MONGO_URI environment variable is not defined.");

    try {
      await mongoose.connect(mongoURI);
      console.log("MongoDB connected successfully.");
    } catch (error) {
      console.error("Failed to connect to MongoDB.");
      throw error;
    }
};