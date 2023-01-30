import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

const create_token = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);

        // create a token if the user is successfully loggedin
        const token = create_token(user._id);

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.register(email, password);

        // create a token if the user is successfully registered
        const token = create_token(user._id);

        res.status(201).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
