const GroupCard = ({ name, members, createdBy }) => {
  return (
    <div className="w-full max-w-lg mx-auto bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700">
          Created by {createdBy || "Unknown"}
        </span>
      </div>
      <div className="mt-3">
        <h4 className="text-sm font-medium text-gray-700 mb-1">Members:</h4>
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
    </div>
  );
};

export default GroupCard;
