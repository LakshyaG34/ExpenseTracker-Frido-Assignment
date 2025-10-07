import express from "express"
import { getMe, getUsers, login, logout, signup } from "../controller/auth.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.get("/me", protectRoute, getMe)
router.get("/users", getUsers)

export default router;