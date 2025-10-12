import { useDispatch } from "react-redux";
import { removeGroup } from "../../redux/groupSlice";

const GroupCard = ({ name, members, createdBy, id }) => {
  const dispatch = useDispatch();
  const handleDelete = async (groupId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/groups/${groupId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Error Deleting Group");
      }
      dispatch(removeGroup(groupId));
      alert("Group Deleted");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full max-w-lg mx-auto bg-purple-500/80 hover:shadow-xl transition-all duration-300 rounded-2xl p-6 border border-transparent [box-shadow:0_0_10px_rgba(200,0,200,1),0_0_20px_rgba(200,0,200,1),0_0_30px_rgba(200,0,200,1)]">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-semibold text-white/90">{name}</h3>
        <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 [box-shadow:0_0_10px_rgba(0,0,250,1),0_0_20px_rgba(0,0,250,1),0_0_30px_rgba(0,0,250,1)]">
          Created by {createdBy || "Unknown"}
        </span>
      </div>
      <div className="mt-3">
        <h4 className="text-sm font-medium text-gray-700 mb-1">Members:</h4>
        {members && members.length > 0 ? (
          <div className="flex flex-wrap gap-2 items-center">
            {members.map((member) => (
              <span
                key={member._id}
                className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
              >
                {member.name}
              </span>
            ))}
            <button
              onClick={() => handleDelete(id)}
              className="mt-2 border border-red-400 text-red-400 rounded-2xl px-2 py-1 cursor-pointer hover:bg-red-100 transition-all duration-200"
            >
              Delete
            </button>
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">No members yet</p>
        )}
      </div>
    </div>
  );
};

export default GroupCard;
