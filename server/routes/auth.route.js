import express from "express"
import { getMe, login, signup } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
router.post("/me", getMe)
// router.get("/auth", (req, res)=>{
//     res.send("hello")
// })

export default router;