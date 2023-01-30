import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { create_workout, delete_workout, get_workout, get_workouts, update_workout } from "../controllers/WorkoutController.js";

export const router = Router();

/*******************************
 * MIDDLEWARE: Authenticate all the users that access the workouts routes
 *******************************/
router.use(authenticate);

/*****************************************
 * WORKOUT API ROUTES
 *****************************************/
router.get("/", get_workouts);

// GET single workout
router.get("/:id", get_workout);

// POST a new workout
router.post("/", create_workout);

router.patch("/:id", update_workout);

// Delete a workout
router.delete("/:id", delete_workout);
