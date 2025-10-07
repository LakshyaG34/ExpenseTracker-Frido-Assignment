const GroupCard = ({ name, members, createdBy }) => {
  return (
    <div>
      <span>{name}</span>
      <span>{createdBy}</span>
      <p className="text-sm text-gray-600">
        Members:{" "}
        {members && members.length > 0
          ? members.map((member) => member.name).join(", ")
          : "No members"}
      </p>
    </div>
  );
};

export default GroupCard;
