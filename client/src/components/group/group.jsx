import React, { useState, useEffect } from "react";
import GroupCard from "../cards/groupCard";

const Groups = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const handleGroups = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/groups", {
          credentials: "include"
        });
        if (!response.ok) throw new Error("Error Fetching groups");
        const data = await response.json();
        setGroups(data);
      } catch (err) {
        console.log(err);
      }
    };
    handleGroups();
  }, []);

  return (
    <div>
      {groups.length > 0
        ? groups.map((group) => (
            <GroupCard
              key={group._id}
              name={group.name}
              createdBy={group.createdBy.name}
              members={group.members}
            />
          ))
        : "No groups to fetch"}
    </div>
  );
};

export default Groups;
