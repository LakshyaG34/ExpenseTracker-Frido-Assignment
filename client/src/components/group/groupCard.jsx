import { useDispatch } from "react-redux";
import { removeGroup } from "../../redux/groupSlice";

const GroupCard = ({ name, members, createdBy, id }) => {
  const dispatch = useDispatch();

  const handleDelete = async (groupId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/groups/${groupId}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Error deleting group");
      dispatch(removeGroup(groupId));
      alert("Group deleted successfully");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-medium border border-blue-200">
          {createdBy ? `By ${createdBy}` : "Unknown"}
        </span>
      </div>

      <div className="mt-3">
        <h4 className="text-sm font-medium text-gray-600 mb-2">Members</h4>
        {members && members.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {members.map((member) => (
              <span
                key={member._id}
                className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
              >
                {member.name}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">No members yet</p>
        )}
      </div>

      <div className="mt-5 flex justify-end">
        <button
          onClick={() => handleDelete(id)}
          className="text-sm font-medium text-red-600 border border-red-300 px-4 py-1.5 rounded-lg hover:bg-red-50 active:scale-95 transition-all duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default GroupCard;
