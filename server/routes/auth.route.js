import express from "express"
import { getMe, login, signup } from "../controller/auth.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
router.get("/me", protectRoute, getMe)

export default router;