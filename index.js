import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { model as EventModel } from "./models/objectDataModel.js";
import  connectDB  from "./config/db.js";
//import  ObjectId  from "mongodb";
// Initialize environment variables
dotenv.config();

// Create the Express app
const app = express();
app.use(bodyParser.json()); // For parsing application/json

let db;
connectDB()
  .then((database) => {
    db = database;
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
const BASE_URL = "/api/v3/app/events";

//GET: Get events by unique ID
//http://localhost:8000/api/v3/app/events/1

app.get(`${BASE_URL}/:id`, async (req, res) => {
  try {
    const eventId = req.params.id;  // Assuming :id is actually uid
    const eventCollection = db.collection("events");
    
    // Modify the query to search by 'uid'
    const event = await eventCollection.findOne({ uid: parseInt(eventId) });
    
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// GET: Get events by recency with pagination
//http://localhost:8000/api/v3/app/events?type=latest&limit=1&page=1
app.get(BASE_URL, async (req, res) => {
  const { type, limit, page } = req.query;
  if (type !== "latest") return res.status(400).json({ message: "Invalid type" });

  try {
    const eventCollection = db.collection("events");
    const events = await eventCollection
      .find()
      .sort({ schedule: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .toArray();
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// POST: Create an event
//http://localhost:8000/api/v3/app/events
app.post(BASE_URL, async (req, res) => {
  try {
    const {
      name,
      files,
      tagline,
      schedule,
      description,
      moderator,
      category,
      sub_category,
      rigor_rank,
    } = req.body;

    if (!name || !files || !tagline || !schedule || !description || !moderator || !category || !sub_category || !rigor_rank) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const eventCollection = db.collection("events");
    const newEvent = {
      name,
      files,
      tagline,
      schedule: new Date(schedule),
      description,
      moderator,
      category,
      sub_category,
      rigor_rank,
    };

    const result = await eventCollection.insertOne(newEvent);
    res.status(201).json({ message: "Event created successfully", eventId: result.insertedId });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// PUT: Update an event by ID
//http://localhost:8000/api/v3/app/events/1
app.put(`${BASE_URL}/:id`, async (req, res) => {
  try {
    const eventId = req.params.id;
    const {
      name,
      files,
      tagline,
      schedule,
      description,
      moderator,
      category,
      sub_category,
      rigor_rank,
    } = req.body;

    // Ensure that essential fields are provided in the request
    if (!name || !files || !tagline || !schedule || !description || !moderator || !category || !sub_category || !rigor_rank) {
      return res.status(400).json({ message: "All fields are required to update the event" });
    }

    const updatedEvent = {
      name,
      files,
      tagline,
      schedule: new Date(schedule),
      description,
      moderator,
      category,
      sub_category,
      rigor_rank,
    };

    const eventCollection = db.collection("events");

    // Ensure that the event exists
    const event = await eventCollection.findOne({ uid: parseInt(eventId) });
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Proceed with the update
    const result = await eventCollection.updateOne({ uid: parseInt(eventId) }, { $set: updatedEvent });

    if (result.modifiedCount === 0) {
      return res.status(400).json({ message: "No changes were made to the event" });
    }

    res.status(200).json({ message: "Event updated successfully" });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// DELETE: Delete an event by ID
//http://localhost:8000/api/v3/app/events/1
app.delete(`${BASE_URL}/:id`, async (req, res) => {
  try {
    const eventId = req.params.id;
    const eventCollection = db.collection("events");
    const result = await eventCollection.deleteOne({ uid: parseInt(eventId) });

    if (result.deletedCount === 0) return res.status(404).json({ message: "Event not found" });
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
