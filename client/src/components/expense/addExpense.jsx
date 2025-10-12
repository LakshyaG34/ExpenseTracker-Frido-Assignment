import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpense } from "../../redux/expenseSlice.js";

const AddExpense = () => {
  const user = useSelector((state) => state.user);
  const group = useSelector((state) => state.group);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [splitType, setSplitType] = useState("equal");
  const [date, setDate] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [splitDetails, setSplitDetails] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedGroup) {
      const groupObj = group.find((g) => g._id === selectedGroup);
      if (groupObj) {
        let details = [];
        if (splitType === "equal") {
          details = groupObj.members.map((member) => ({
            userId: member._id,
            amount: amount ? Number(amount) / groupObj.members.length : 0,
          }));
        } else if (splitType === "percentage") {
          details = groupObj.members.map((member) => ({
            userId: member._id,
            percentage: 0,
            amount: 0,
          }));
        } else {
          details = groupObj.members.map((member) => ({
            userId: member._id,
            amount: 0,
          }));
        }
        setSplitDetails(details);
      }
    }
  }, [selectedGroup, amount, splitType, group]);
  const handleSplitChange = (userId, value) => {
    if (splitType === "percentage") return;
    setSplitDetails((prev) =>
      prev.map((s) => (s.userId === userId ? { ...s, amount: Number(value) } : s))
    );
  };
  const handlePercentageChange = (userId, percentValue) => {
    setSplitDetails((prev) =>
      prev.map((s) =>
        s.userId === userId
          ? { ...s, percentage: Number(percentValue), amount: (Number(amount) * Number(percentValue)) / 100 }
          : s
      )
    );
  };

  const handleExpense = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          description,
          amount,
          category,
          splitType,
          date,
          paidBy,
          groupId: selectedGroup,
          splitDetails,
        }),
      });
      if (!response.ok) throw new Error("Cannot Send Expense");
      const data = await response.json();
      dispatch(addExpense(data));
      alert("Expense Added");
      console.log("Expense added");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex px-4 py-10 justify-center min-h-screen items-center">
      <form
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 space-y-5 border border-gray-100"
        onSubmit={handleExpense}
      >
        <input
          className="w-full border border-gray-300 focus:border-blue-400 focus:ring-blue-200 p-2 rounded-lg outline-none"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="w-full border border-gray-300 focus:border-blue-400 focus:ring-blue-200 p-2 rounded-lg outline-none"
          placeholder="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="relative">
          <button
            type="button"
            className="w-full border border-gray-300 p-2 rounded-lg text-left hover:bg-gray-50"
            onClick={() => setIsOpen1((prev) => !prev)}
          >
            {paidBy ? `Paid By: ${user.find((u) => u._id === paidBy)?.name}` : "Select Paid By"}
          </button>
          {isOpen1 && (
            <ul className="absolute z-10 bg-white border border-gray-200 rounded-lg mt-1 w-full max-h-32 overflow-auto shadow-md">
              {user.length === 0
                ? <li className="p-2">Loading users...</li>
                : user.map((i) => (
                    <li
                      key={i._id}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        setPaidBy(i._id);
                        setIsOpen1(false);
                      }}
                    >
                      {i.name}
                    </li>
                  ))}
            </ul>
          )}
        </div>
        <div className="relative">
          <button
            type="button"
            className="border p-1 rounded w-full text-left"
            onClick={() => setIsOpen2((prev) => !prev)}
          >
            {selectedGroup ? `Group: ${group.find((g) => g._id === selectedGroup)?.name}` : "Select Group"}
          </button>
          {isOpen2 && (
            <ul className="absolute z-10 bg-white border rounded mt-1 w-full max-h-32 overflow-auto">
              {group.length === 0
                ? <li className="p-2">Loading Groups...</li>
                : group.map((g) => (
                    <li
                      key={g._id}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        setSelectedGroup(g._id);
                        setIsOpen2(false);
                      }}
                    >
                      {g.name}
                    </li>
                  ))}
            </ul>
          )}
        </div>

        <input
          className="w-full border border-gray-300 focus:border-blue-400 focus:ring-blue-200 p-2 rounded-lg outline-none"
          placeholder="Enter Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <div>
          <label className="mr-2 font-semibold">Split Type:</label>
          <select
            value={splitType}
            onChange={(e) => setSplitType(e.target.value)}
            className="w-full border border-gray-300 focus:border-blue-400 focus:ring-blue-200 p-2 rounded-lg outline-none"
          >
            <option value="equal">Equal</option>
            <option value="unequal">Unequal</option>
            <option value="percentage">Percentage</option>
          </select>
        </div>
        {selectedGroup && splitDetails.length > 0 && (
          <div className="border p-2 rounded mt-2">
            <h4 className="font-semibold mb-1">Split Details:</h4>
            {splitDetails.map((s) => {
              const member = group.find((g) => g._id === selectedGroup).members.find((m) => m._id === s.userId);
              return (
                <div key={s.userId} className="flex justify-between items-center mb-1">
                  <span>{member?.name}</span>
                  {splitType === "percentage" ? (
                    <input
                      type="number"
                      className="border rounded px-2 py-1 w-20"
                      value={s.percentage || 0}
                      onChange={(e) => handlePercentageChange(s.userId, e.target.value)}
                      placeholder="%"
                    />
                  ) : (
                    <input
                      type="number"
                      className="border rounded px-2 py-1 w-20"
                      value={s.amount}
                      onChange={(e) => handleSplitChange(s.userId, e.target.value)}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
        <div>
          <label className="mr-2 font-semibold">Date:</label>
          <input
            type="date"
            className="border rounded px-2 py-1"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg shadow transition-all duration-200"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
