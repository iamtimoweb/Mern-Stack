// Get all workouts

import mongoose from "mongoose";
import { Workout } from "../models/Workout.js";

export const create_workout = async (req, res) => {
    const { title, reps, load } = req.body;
    let empty_fields = [];

    if (!title) {
        empty_fields.push("title");
    }
    if (!load) {
        empty_fields.push("load");
    }
    if (!reps) {
        empty_fields.push("reps");
    }
    if (empty_fields.length > 0) {
        return res.status(400).json({ error: "please fill in all the fields", empty_fields });
    }
    try {
        const user_id = req.user._id;
        const data = await Workout.create({ title, reps, load, user_id });
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const get_workouts = async (req, res) => {
    // fetch all the workouts based on the authenticated user
    const user_id = req.user._id;
    const data = await Workout.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(data);
};

export const get_workout = async (req, res) => {
    // fetch the id from the route parameter
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: `workout with id=${id} doesnot exist` });
    }
    const data = await Workout.findById(id);

    res.status(200).json(data);
};

export const update_workout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: `workout with id=${id} doesnot exist` });
    }

    const data = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });

    res.status(202).json(data);
};

export const delete_workout = async (req, res) => {
    // fetch the id from the route parameter
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: `workout with id=${id} doesnot exist` });
    }
    const data = await Workout.findOneAndDelete({ _id: id });

    res.status(200).json(data);
};
