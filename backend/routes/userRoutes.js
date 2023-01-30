import { Router } from "express";
import { login, register } from "../controllers/UserController.js";

export const router = Router();

/*****************************************
 * AUTHENTICATION API ROUTES
 *****************************************/
// login route
router.post("/login", login);
router.post("/register", register);
