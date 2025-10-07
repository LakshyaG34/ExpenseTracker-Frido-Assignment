import express from "express"
import { createExpense, deleteExpense, getExpense, getExpenses, updateExpense } from "../controller/expense.controller.js";

const router = express.Router();

router.post("/expenses", createExpense)
router.get("/expenses", getExpense)
router.get("/expenses/all", getExpenses)
router.delete("/expenses/:expenseId", deleteExpense)
router.put("/expenses/:expenseId", updateExpense)


export default router;