import express from "express"
import { getMe, getUsers, login, signup } from "../controller/auth.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
router.get("/me", protectRoute, getMe)
router.get("/all", getUsers)

export default router;