import express from "express"
import { createGroup, deleteGroup, getGroup } from "../controller/group.controller.js";

const router = express.Router();

router.post("/groups", createGroup)
router.get("/groups", getGroup)
router.delete("/groups/:groupId", deleteGroup);

export default router;