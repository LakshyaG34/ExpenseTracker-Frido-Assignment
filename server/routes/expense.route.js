import express from "express"
import { createExpense, getExpense } from "../controller/expense.controller.js";

const router = express.Router();

router.post("/expenses", createExpense)
router.get("/expenses", getExpense)

export default router;