import GroupCard from "./groupCard";
import { useSelector } from "react-redux";

const Groups = () => {
  const groups = useSelector((state) => state.group);

  if (!groups || groups.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 text-lg">
        No groups available
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        GROUPS
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {groups.map((group) => (
          <GroupCard
            key={group._id}
            name={group.name}
            createdBy={group.createdBy?.name}
            members={group.members}
            id={group._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Groups;
