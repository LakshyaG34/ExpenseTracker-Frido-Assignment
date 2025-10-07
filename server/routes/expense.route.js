import express from "express"
import { createExpense, getExpense, getExpenses, getGroupBalances } from "../controller/expense.controller.js";

const router = express.Router();

router.post("/expenses", createExpense)
router.get("/expenses", getExpense)
router.get("/expenses/all", getExpenses)


export default router;