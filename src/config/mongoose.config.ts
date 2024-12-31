import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    // Determine the MongoDB URI based on the current environment
    let MONGO_URI: string;

    switch (process.env.NODE_ENV) {
      case 'production':
        MONGO_URI = process.env.MONGO_URI as string;
        break;
      case 'test':
        MONGO_URI = process.env.MONGO_URI_TEST as string; 
        break;
      case 'development':
      default:
        MONGO_URI = process.env.MONGO_URI_DEV as string; 
        break;
    }

    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log(`MongoDB connected successfully to ${process.env.NODE_ENV} environment`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
