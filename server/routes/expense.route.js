import express from "express"
import { createExpense, deleteExpense, getExpense, getExpenses } from "../controller/expense.controller.js";

const router = express.Router();

router.post("/expenses", createExpense)
router.get("/expenses", getExpense)
router.get("/expenses/all", getExpenses)
router.delete("/expenses/:expenseId", deleteExpense)


export default router;