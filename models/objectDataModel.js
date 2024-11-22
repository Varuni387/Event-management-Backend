import mongoose from "mongoose";

const schema = new mongoose.Schema({
    uid: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    tagline: {
        type: String,
        required: true
    },
    schedule: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    files: {
        type: String, 
        required: true
    },
    moderator: {
        type: String, 
        required: true
    },
    category: {
        type: String,
        required: true
    },
    sub_category: {
        type: String,
        required: true
    },
    rigor_rank: {
        type: Number,
        required: true
    },
    attendees: {
        type: [Number], // Array of user IDs
        default: []
    }
});

export const model = mongoose.model("EventModel", schema);
