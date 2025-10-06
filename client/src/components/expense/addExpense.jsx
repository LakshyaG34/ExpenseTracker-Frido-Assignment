import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

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

  useEffect(() => {
    if (selectedGroup) {
      const groupObj = group.find((g) => g._id === selectedGroup);
      if (groupObj) {
        const details = groupObj.members.map((member) => ({
          userId: member._id,
          amount: splitType === "equal" ? (amount ? Number(amount) / groupObj.members.length : 0) : 0,
        }));
        setSplitDetails(details);
      }
    }
  }, [selectedGroup, amount, splitType, group]);

  const handleSplitChange = (userId, value) => {
    setSplitDetails((prev) =>
      prev.map((s) => (s.userId === userId ? { ...s, amount: Number(value) } : s))
    );
  };

  const handleExpense = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/expenses", {
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
          splitDetails
        }),
      });
      if (!response.ok) throw new Error("Cannot Send Expense");
      alert("Expense Added")
      console.log("Expense added");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center min-h-screen items-center">
      <form className="flex flex-col gap-2 p-4 border rounded" onSubmit={handleExpense}>
        <input
          className="border p-1 rounded"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="border p-1 rounded"
          placeholder="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <div className="relative">
          <button
            type="button"
            className="border p-1 rounded w-full text-left"
            onClick={() => setIsOpen1((prev) => !prev)}
          >
            {paidBy ? `Paid By: ${user.find((u) => u._id === paidBy)?.name}` : "Select Paid By"}
          </button>
          {isOpen1 && (
            <ul className="absolute z-10 bg-white border rounded mt-1 w-full max-h-32 overflow-auto">
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
                  ))
              }
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
                  ))
              }
            </ul>
          )}
        </div>

        <input
          className="border p-1 rounded"
          placeholder="Enter Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <div>
          <label className="mr-2 font-semibold">Split Type:</label>
          <select
            value={splitType}
            onChange={(e) => setSplitType(e.target.value)}
            className="border rounded px-2 py-1"
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
                  <input
                    type="number"
                    className="border rounded px-2 py-1 w-20"
                    value={s.amount}
                    onChange={(e) => handleSplitChange(s.userId, e.target.value)}
                  />
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
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mt-2 cursor-pointer"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
