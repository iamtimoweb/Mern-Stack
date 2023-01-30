import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { router as useRouter } from "./routes/userRoutes.js";
import { router as workoutRoutes } from "./routes/workoutRoutes.js";

//config the dotenv
dotenv.config();

// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());

/***************************************
 * API Routes
 ***************************************/
app.use("/api/users", useRouter);
app.use("/api/workouts", workoutRoutes);

/*****************************
 * PORT NUMBER FOR THE SERVER
 *****************************/
const PORT = process.env.PORT || 5000;

/*****************************
 * connect app to database
 * ***************************/
mongoose
    .connect(process.env.DB_CONNECTION_URL)
    .then(() => {
        //listener for requests
        app.listen(PORT, () => {
            console.log("connected to database and listening on port: ", PORT);
        });
    })
    .catch((err) => {
        console.log(err.message);
    });
