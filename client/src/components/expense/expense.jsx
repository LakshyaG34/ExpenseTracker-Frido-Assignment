import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {removeExpense} from "../../redux/expenseSlice.js"

const Expense = () => {

  const [newCategory, setNewCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const expenses = useSelector((state) => state.expense);
  const dispatch = useDispatch();
  const itemsPerPage = 3;

  const handleDelete = async (expenseId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/expenses/${expenseId}`,
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

    const filteredExpense = (category) =>{
      if(!category.trim())
      {
        return expenses;
      }
      return expenses.filter((e)=>e.category.toLowerCase() === category.toLowerCase());
    }

    const finalExpense = filteredExpense(newCategory);

    const totalPages = Math.ceil(finalExpense.length/itemsPerPage);
    const paginatedExpenses = finalExpense.slice((currentPage - 1)*itemsPerPage, currentPage*itemsPerPage);

    const handlePrev = () =>{
      if(currentPage > 1)
      {
        setCurrentPage(currentPage - 1);
      }
    }
    const handleNext = () =>{
      if(currentPage < totalPages)
      {
        setCurrentPage(currentPage + 1);
      }
    }


  return (
    <div className="min-h-screen py-10 px-5">
      <h2 className="text-4xl font-semibold text-center text-white mb-12">
        Expenses
      </h2>
      <input placeholder="Search By Category...." value = {newCategory} onChange = {(e)=>setNewCategory(e.target.value)} className="text-pink-400 border border-pink-500 rounded-2xl p-2 mx-auto block mb-10"/>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedExpenses.map((expense) => (
          <div
            key={expense._id}
            className="bg-pink-400/50 border border-pink-500 shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-shadow duration-300 [box-shadow:0_0_10px_rgba(240,100,100,0.8),0_0_10px_rgba(240,100,100,0.8),0_0_10px_rgba(240,100,100,0.8),0_0_10px_rgba(100,100,240,0.8)] hover:[box-shadow:0_0_10px_rgba(240,100,100,0.8),0_0_20px_rgba(240,100,100,0.8),0_0_20px_rgba(240,100,100,0.8),0_0_30px_rgba(240,100,100,0.8)]"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold text-white">
                {expense.description}
              </h3>
              <span className="text-sm px-3 py-1 rounded-full bg-green-100 text-green-700 [box-shadow:0_0_10px_rgba(50,240,50,0.8),0_0_10px_rgba(50,240,50,0.8),0_0_10px_rgba(50,240,50,0.8),0_0_10px_rgba(50,240,50,0.8)]">
                {expense.category}
              </span>
            </div>

            <div className="text-white space-y-1">
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
      <div className="flex w-full max-w-xl justify-between mx-auto mt-10">
        <button onClick = {handlePrev} disabled={currentPage===1} className="border border-white rounded-lg text-white p-2 hover:bg-white/60 hover:text-black transition duration-200">
          Prev
        </button>
        <span className="border border-white rounded-lg text-white p-2 hover:bg-white/60 hover:text-black transition duration-200">{currentPage}</span>
        <button onClick = {handleNext} disabled={currentPage===totalPages} className="border border-white rounded-lg text-white p-2 hover:bg-white/60 hover:text-black transition duration-200">
          Next
        </button>
      </div>
    </div>
  );
};

export default Expense;
