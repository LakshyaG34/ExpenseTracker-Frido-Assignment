import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGroup } from "../../redux/groupSlice.js";

const AddGroup = () => {
  const user = useSelector((state) => state.user);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState("");
  const [selectedCreatorName, setSelectedCreatorName] = useState("");
  const [isMembersOpen, setIsMembersOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [name, setName] = useState("");
  const dispatch = useDispatch();

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
      const data = await response.json();
      dispatch(addGroup(data));
      alert("Group Created");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      className="flex flex-col justify-center items-center min-h-screen gap-5 px-4"
      onSubmit={handleGroups}
    >
      <div className="bg-white p-8 rounded-2xl w-full max-w-md border border-gray-100 [box-shadow:0_0_10px_rgba(200,200,100,1),0_0_20px_rgba(200,100,200,1),0_0_20px_rgba(100,200,200,1),0_0_10px_rgba(100,200,100,1)] hover:[box-shadow:0_0_20px_rgba(200,200,100,1),0_0_30px_rgba(200,100,200,1),0_0_40px_rgba(100,200,200,1),0_0_60px_rgba(100,200,100,1)] transition duration-300">
        <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">
          Create New Group
        </h2>

        <input
          placeholder="Group Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <div className="relative w-full mb-4">
          <button
            type="button"
            className="border border-gray-300 p-2 rounded-lg w-full text-left bg-white hover:bg-gray-50 transition"
            onClick={() => setIsCreatorOpen((prev) => !prev)}
          >
            {selectedCreatorName || "Choose Creator"}
          </button>
          {isCreatorOpen && (
            <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg mt-1 w-full max-h-40 overflow-auto shadow-md">
              {user.length === 0 ? (
                <li className="p-2 text-gray-500">Loading users...</li>
              ) : (
                user.map((u) => (
                  <li
                    key={u._id}
                    className="p-2 hover:bg-blue-100 cursor-pointer transition"
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
        <div className="relative w-full mb-4">
          <button
            type="button"
            className="border border-gray-300 p-2 rounded-lg w-full text-left bg-white hover:bg-gray-50 transition"
            onClick={() => setIsMembersOpen((prev) => !prev)}
          >
            {selectedMembers.length > 0
              ? `Members: ${selectedMembers.length} selected`
              : "Select Members"}
          </button>
          {isMembersOpen && (
            <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg mt-1 w-full max-h-40 overflow-auto shadow-md">
              {user.length === 0 ? (
                <li className="p-2 text-gray-500">Loading users...</li>
              ) : (
                user.map((u) => (
                  <li
                    key={u._id}
                    className={`p-2 cursor-pointer transition ${
                      selectedMembers.includes(u._id)
                        ? "bg-blue-100 font-medium"
                        : "hover:bg-gray-100"
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
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition transform hover:scale-[1.02]"
        >
          Create Group
        </button>
      </div>
    </form>
  );
};

export default AddGroup;
