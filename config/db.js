import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

let dbInstance;

export async function connectDB() {
  if (dbInstance) return dbInstance; // Return the existing instance if already connected
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect(); // Connect to MongoDB
    dbInstance = client.db("test"); // Replace "eventDB" with your database name
    console.log("Connected to MongoDB!");
    return dbInstance;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}export default connectDB;
