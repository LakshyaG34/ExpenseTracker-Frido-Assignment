import Expense from "../models/expense.model.js";

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
