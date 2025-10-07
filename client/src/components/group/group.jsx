import GroupCard from "./groupCard";
import { useSelector } from "react-redux";

const Groups = () => {
  const groups = useSelector((state) => state.group);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100">
      {groups.length > 0
        ? groups.map((group) => (
            <GroupCard
              key={group._id}
              name={group.name}
              createdBy={group.createdBy.name}
              members={group.members}
              id={group._id}
            />
          ))
        : "No groups to fetch"}
    </div>
  );
};

export default Groups;
