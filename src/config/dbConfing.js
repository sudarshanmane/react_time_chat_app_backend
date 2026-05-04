import mongoose from "mongoose";
import { MONGO_URL } from "./envConfig.js";

export const connectDB = async () => {
  try {
    return await mongoose.connect(MONGO_URL);
  } catch (error) {
    console.log(error);
    throw new Error("MongoDB Connection failed!");
  }
};
