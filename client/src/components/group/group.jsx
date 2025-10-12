import GroupCard from "./groupCard";
import { useSelector } from "react-redux";

const Groups = () => {
  const groups = useSelector((state) => state.group);

  return (
    <div className="min-h-screen py-6 mt-14">
      <div className="flex flex-wrap gap-4">
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
    </div>
  );
};

export default Groups;
