import { useDispatch, useSelector } from "react-redux";
import {removeExpense} from "../../redux/expenseSlice.js"

const Expense = () => {
  const expenses = useSelector((state) => state.expense);
  const dispatch = useDispatch();

  const handleDelete = async (expenseId) => {
    try {
      const response = await fetch(`/api/expenses/${expenseId}`,
        {
          method: "DELETE"
        }
      );
      if(!response.ok)
      {
        throw new Error("Error in handleExpense Delete")
      }
      dispatch(removeExpense(expenseId))
      alert("Expense Deleted!!!")
    } catch (err) {
      console.log(err);
    }
  };

  if (!expenses || expenses.length === 0)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 text-lg">
        No expenses found
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        Expenses
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {expenses.map((expense) => (
          <div
            key={expense._id}
            className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold text-gray-800">
                {expense.description}
              </h3>
              <span className="text-sm px-3 py-1 rounded-full bg-green-100 text-green-700">
                {expense.category}
              </span>
            </div>

            <div className="text-gray-700 space-y-1">
              <p>
                <span className="font-medium">Amount:</span> ₹
                {expense.amount.toLocaleString()}
              </p>
              <p>
                <span className="font-medium">Paid By:</span>{" "}
                {expense.paidBy?.name || "Unknown"}
              </p>
              <p>
                <span className="font-medium">Group:</span>{" "}
                {expense.groupId?.name || "None"}
              </p>
              <p>
                <span className="font-medium">Split Type:</span>{" "}
                {expense.splitType}
              </p>
            </div>

            <div className="mt-4 bg-gray-50 rounded-lg p-3">
              <h4 className="font-medium text-gray-800 mb-2">Split Details</h4>
              <ul className="space-y-1 text-gray-600 text-sm">
                {expense.splitDetails.map((split) => (
                  <li
                    key={split._id}
                    className="flex justify-between border-b border-gray-200 pb-1"
                  >
                    <span>{split.userId?.name || "Unknown"}</span>
                    <span>₹{split.amount}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-xs text-gray-500 mt-3 text-right">
              {new Date(expense.date).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
            <button onClick = {()=>handleDelete(expense._id)} className="mt-2 border border-red-400 text-red-400 rounded-2xl px-2 py-1 cursor-pointer hover:bg-red-100 transition-all duration-200">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Expense;
