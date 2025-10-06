import mongoose from "mongoose";
import Auth from "./auth.model.js";
import Group from "./group.model.js";

const expenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paidBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
    required: true
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    required: true
  },
  category: {
    type: String,
    required: true
  },
  splitType: {
    type: String,
    enum: ["equal", "unequal", "percentage"],
    required: true
  },
  splitDetails: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      amount: { type: Number, required: true }
    }
  ],
  date: {
    type: Date,
    required: true
  }
}, { timestamps: true });

export default mongoose.models.Expense || mongoose.model("Expense", expenseSchema);
