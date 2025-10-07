import express from "express"
import { createGroup, deleteGroup, getGroup, getGroupById, updateGroup } from "../controller/group.controller.js";

const router = express.Router();

router.post("/groups", createGroup)
router.get("/groups", getGroup)
router.get("/groups/:groupId", getGroupById)
router.delete("/groups/:groupId", deleteGroup);
router.put("/groups/:groupId", updateGroup);

export default router;