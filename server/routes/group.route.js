import express from "express"
import { createGroup, getGroup } from "../controller/group.controller.js";

const router = express.Router();

router.post("/groups", createGroup)
router.get("/groups", getGroup)

export default router;