import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Expense = () => {
  const category = useSelector((state) => state.category);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/expenses?category=${category}`,
          { credentials: "include" }
        );
        if (!response.ok) {
          throw new Error("Cannot fetch Expense");
        }
        const data = await response.json();
        setExpenses([data]);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    handleFetch();
  }, [category]);

  if (loading) return <div>Loading...</div>;

  if (expenses.length === 0) return <div>No expenses found</div>;

  return (
    <div>
      <h2>Expenses for category: {category}</h2>
      {expenses.map((expense) => (
        <div key={expense._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>{expense.description}</h3>
          <p>Amount: {expense.amount}</p>
          <p>Paid By: {expense.paidBy.name}</p>
          <p>Group: {expense.groupId.name}</p>
          <p>Category: {expense.category}</p>
          <p>Split Type: {expense.splitType}</p>
          <div>
            <strong>Split Details:</strong>
            <ul>
              {expense.splitDetails.map((split) => (
                <li key={split._id}>
                  UserID: {split.userId}, Amount: {split.amount}
                </li>
              ))}
            </ul>
          </div>
          <p>Date: {new Date(expense.date).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Expense;
