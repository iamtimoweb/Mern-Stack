import { Schema, model } from "mongoose";

// creating the schema for the workout documents
const workoutSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        reps: {
            type: Number,
            required: true,
        },
        load: {
            type: Number,
            required: true,
        },
        // relationship
        user_id: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

// creating model for the workout documents
export const Workout = model("Workout", workoutSchema);
