import { useState } from "react";
import { useSelector } from "react-redux";

const AddGroup = () => {
  const user = useSelector((state) => state.user);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState("");
  const [selectedCreatorName, setSelectedCreatorName] = useState("");
  const [isMembersOpen, setIsMembersOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [name, setName] = useState("");

  const toggleMemberSelection = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const handleGroups = async (e) => {
    e.preventDefault();
    if (!name || !selectedCreator || selectedMembers.length === 0) {
      alert("Please enter group name, select creator, and at least one member");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/groups", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name,
          membersIdArr: selectedMembers,
          createdByUserId: selectedCreator,
        }),
      });

      if (!response.ok) throw new Error("Cannot create group");
      alert("Group Created");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      className="flex flex-col justify-center items-center min-h-screen gap-4 bg-gradient-to-br from-blue-50 to-blue-100"
      onSubmit={handleGroups}
    >
      <input
        placeholder="Group Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded w-64"
      />

      <div className="relative w-64">
        <button
          type="button"
          className="border p-2 rounded w-full text-left"
          onClick={() => setIsCreatorOpen((prev) => !prev)}
        >
          {selectedCreatorName || "Choose Creator"}
        </button>
        {isCreatorOpen && (
          <ul className="absolute z-10 bg-white border rounded mt-1 w-full max-h-32 overflow-auto">
            {user.length === 0 ? (
              <li className="p-2">Loading users...</li>
            ) : (
              user.map((u) => (
                <li
                  key={u._id}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setSelectedCreator(u._id);
                    setSelectedCreatorName(u.name);
                    setIsCreatorOpen(false);
                  }}
                >
                  {u.name}
                </li>
              ))
            )}
          </ul>
        )}
      </div>

      <div className="relative w-64">
        <button
          type="button"
          className="border p-2 rounded w-full text-left"
          onClick={() => setIsMembersOpen((prev) => !prev)}
        >
          {selectedMembers.length > 0
            ? `Members: ${selectedMembers.length} selected`
            : "Select Members"}
        </button>
        {isMembersOpen && (
          <ul className="absolute z-10 bg-white border rounded mt-1 w-full max-h-40 overflow-auto">
            {user.length === 0 ? (
              <li className="p-2">Loading users...</li>
            ) : (
              user.map((u) => (
                <li
                  key={u._id}
                  className={`p-2 hover:bg-gray-200 cursor-pointer ${
                    selectedMembers.includes(u._id) ? "bg-gray-100" : ""
                  }`}
                  onClick={() => toggleMemberSelection(u._id)}
                >
                  {u.name}
                </li>
              ))
            )}
          </ul>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Create Group
      </button>
    </form>
  );
};

export default AddGroup;
