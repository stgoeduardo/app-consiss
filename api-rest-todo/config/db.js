// imports
import mongoose from "mongoose";

// set const values
const MONGO_CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

export const connectDB = async() => {
  try {
    const connection = await mongoose.connect(
      process.env.MONGO_URI,
      MONGO_CONFIG
    );
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error when to connect MongoDB ${error.message}`);
    process.exit(1);
  }
}