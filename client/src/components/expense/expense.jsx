import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeExpense } from "../../redux/expenseSlice.js";

const Expense = () => {
  const [newCategory, setNewCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const expenses = useSelector((state) => state.expense);
  const dispatch = useDispatch();
  const itemsPerPage = 3;

  const handleDelete = async (expenseId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/expenses/${expenseId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Error in handleExpense Delete");
      }
      dispatch(removeExpense(expenseId));
      alert("Expense Deleted!!!");
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

  const filteredExpense = (category) => {
    if (!category.trim()) {
      return expenses;
    }
    return expenses.filter(
      (e) => e.category.toLowerCase() === category.toLowerCase()
    );
  };

  const finalExpense = filteredExpense(newCategory);

  const totalPages = Math.ceil(finalExpense.length / itemsPerPage);
  const paginatedExpenses = finalExpense.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen py-10 px-5 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Expenses
      </h2>
      <input
        placeholder="Search By Category...."
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        className="block mx-auto mb-10 w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-sm"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedExpenses.map((expense) => (
          <div
            key={expense._id}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800">
                {expense.description}
              </h3>
              <span className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                {expense.category}
              </span>
            </div>

            <div className="text-gray-700 space-y-1 text-sm">
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
              <h4 className="font-medium text-gray-800 mb-2 text-sm">Split Details</h4>
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

            <p className="text-xs text-right text-black italic tracking-wider mt-3">
              {new Date(expense.date).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
            <button
              onClick={() => handleDelete(expense._id)}
              className="mt-3 w-full max-w-[80px] border border-red-400 text-red-300 rounded-2xl px-3 py-2 
            hover:bg-red-500 hover:text-white hover:shadow-[0_0_15px_rgba(255,0,0,0.6)] 
              active:scale-95 transition-all duration-200 cursor-pointer"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-gray-700 font-medium">{currentPage}</span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Expense;
