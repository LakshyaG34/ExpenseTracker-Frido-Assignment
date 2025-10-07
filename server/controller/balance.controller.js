import Auth from "../models/auth.model.js";
import Expense from "../models/expense.model.js";

export const getGroupBalances = async (req, res) => {
  try {
    const expenses = await Expense.find()
      .populate("groupId", "name")
      .populate("paidBy", "name")
      .populate("splitDetails.userId", "name");

    if (!expenses || expenses.length === 0) {
      return res.status(404).json({ message: "No expenses found" });
    }

    const groupMap = {};
    for (const exp of expenses) {
      const groupName = exp.groupId?.name || "Ungrouped";
      if (!groupMap[groupName]) groupMap[groupName] = [];
      groupMap[groupName].push(exp);
    }

    const result = [];

    for (const [groupName, groupExpenses] of Object.entries(groupMap)) {
      const balances = new Map();

      for (const exp of groupExpenses) {
        const payerId = exp.paidBy._id.toString();

        balances.set(payerId, (balances.get(payerId) || 0) + exp.amount);

        for (const split of exp.splitDetails) {
          const userId = split.userId._id.toString();
          balances.set(userId, (balances.get(userId) || 0) - split.amount);
        }
      }

      const debtors = [];
      const creditors = [];

      for (const [userId, balance] of balances.entries()) {
        const user = await Auth.findById(userId).select("name");
        if (!user) continue;

        if (balance < 0) {
          debtors.push({ userId, name: user.name, amountOwes: -balance });
        } else if (balance > 0) {
          creditors.push({ userId, name: user.name, amountGets: balance });
        }
      }

      const settlements = [];
      let i = 0,
        j = 0;

      while (i < debtors.length && j < creditors.length) {
        const debtor = debtors[i];
        const creditor = creditors[j];
        const amount = Math.min(debtor.amountOwes, creditor.amountGets);

        settlements.push({
          from: debtor.name,
          to: creditor.name,
          amount,
        });

        debtor.amountOwes -= amount;
        creditor.amountGets -= amount;

        if (debtor.amountOwes === 0) i++;
        if (creditor.amountGets === 0) j++;
      }

      result.push({
        group: groupName,
        settlements,
      });
    }

    res.status(200).json({
      message: "Group-wise balances calculated successfully",
      data: result,
    });
  } catch (err) {
    console.error("Error calculating balances:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};