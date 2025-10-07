import Expense from "../models/expense.model.js";
import mongoose from "mongoose";

export const createExpense = async (req, res) => {
  try {
    const {description, amount, paidBy, groupId, category, splitType, splitDetails, date} = req.body;

    if (!description ||!amount ||!paidBy ||!groupId ||!category ||!splitType ||!date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (
      !Array.isArray(splitDetails) ||
      splitDetails.length === 0 ||
      !splitDetails.every(d => d.userId && d.amount)
    ) {
      return res.status(400).json({ error: "Invalid splitDetails array" });
    }

    const expense = await Expense.create({
      description,
      amount,
      paidBy,
      groupId,
      category,
      splitType,
      splitDetails,
      date: new Date(date)
    });

    res.status(201).json(expense);
    console.log(expense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getExpense = async(req, res) =>{
    try{
        const {category} = req.query;
        const expense = await Expense.findOne({category}).populate("paidBy", "name").populate("groupId", "name");
        if(!expense)
        {
            res.status(404).json({err : "Expense does not exist"});
        }
        res.status(200).json(expense);
    }catch(err)
    {
        console.log(err);
        res.status(500).json({Error : "Internal Server Error"})
    }
}
export const getExpenses = async(req, res) =>{
    try{
        // const {category} = req.query;
        const expenses = await Expense.find().populate("paidBy", "name").populate("groupId", "name").populate("splitDetails.userId", "name");
        if(!expenses)
        {
            res.status(404).json({err : "Expense does not exist"});
        }
        res.status(200).json(expenses);
    }catch(err)
    {
        console.log(err);
        res.status(500).json({Error : "Internal Server Error"})
    }
}

export const deleteExpense = async(req, res)=>{
  try{
    const {expenseId} = req.params;
    const expense = await Expense.findById(expenseId);
    if(!expense)
    {
      res.status(200).json({message : "Expense Not found"})
    }
    await Expense.findByIdAndDelete(expenseId);
    res.status(200).json({message : "Expense Deleted"})
  }catch(err)
  {
    console.log(err);
    res.status(200).json({message : "Internal Server Error"})
  }
}

export const updateExpense = async(req, res) =>{
  try{
    const {expenseId} = req.params;
    const updates = req.body;
    const expense = await Expense.findById(expenseId);
    if(!expense)
    {
      res.status(400).json({err : "Expense does not exist"})
    }
    const updatedExpense = await Expense.findByIdAndUpdate(expenseId,
      { $set: updates },
      { new: true, runValidators: true }
    );
    res.status(200).json({message : "Expense Updated Successfully", expense:updatedExpense})
  }catch(err)
  {
    console.log(err);
    res.status(500).json({Error : "Internal Server error"})
  }
}

export const getGroupTotalExpense = async (req, res) => {
  try {
    const { groupId } = req.params;

     const objectGroupId = new mongoose.Types.ObjectId(groupId);

    const result = await Expense.aggregate([
      { $match: { groupId: objectGroupId } },
      {
        $group: {
          _id: "$groupId",
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 }
        }
      }
    ]);

    if (result.length === 0) {
      return res.status(404).json({ message: "No expenses found for this group" });
    }

    res.status(200).json({
      groupId: result[0]._id,
      totalAmount: result[0].totalAmount,
      totalExpenses: result[0].count,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching total expense" });
  }
};
