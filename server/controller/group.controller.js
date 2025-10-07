import Group from "../models/group.model.js";

export const createGroup = async(req, res) =>{
    try{
        const {name, membersIdArr, createdByUserId} = req.body;
        if(!name || !membersIdArr || !Array.isArray(membersIdArr) || membersIdArr.length == 0 || !createdByUserId)
        {
            return res.status(404).json({err : "Missing Fields"})
        }
        const group = await Group.create({
            name,
            members : membersIdArr,
            createdBy : createdByUserId
        })
        res.status(201).json(group);
        console.log(group);
    }catch(err)
    {
        console.log(err);
        res.status(500).json({Error : "Internal Server Error"})
    }
}

export const getGroup = async(req, res) =>{
    try{
        const groups = await Group.find()
        .populate("members", "name email")
        .populate("createdBy", "name email");
        if(!groups)
        {
            return res.status(404).json({err : "Group does not exist"})
        }
        res.status(200).json(groups);
    }catch(err)
    {
        console.log(err);
    }
}

export const getGroupById = async(req, res) =>{
    try{
        const {groupId} = req.params;
        const group = await Group.findById(groupId);
        if(!group)
        {
            return res.status(404).json({err : "Group does not exist"})
        }
        res.status(200).json(group);
    }catch(err)
    {
        console.log(err);
        res.status(500).json({Err : "Internal Server Error"})
    }
}

export const deleteGroup = async(req, res) =>{
    try{
        const {groupId} = req.params;
        const group = await Group.findById(groupId);
        if(!group)
        {
            return res.status(404).json({err : "Group does not exist"})
        }
        await Group.findByIdAndDelete(groupId);
        res.status(200).json({message : "Group Deleted!!!"})
    }catch(err)
    {
        console.log(err);
        res.status(500).json({message : "Internal Server Error"})
    }
}

export const updateGroup = async(req, res) =>{
  try{
    const {groupId} = req.params;
    const updates = req.body;
    const group = await Group.findById(groupId);
    if(!group)
    {
      return res.status(404).json({err : "Expense does not exist"})
    }
    const updatedGroup = await Group.findByIdAndUpdate(groupId,
      { $set: updates },
      { new: true, runValidators: true }
    );
    res.status(200).json({message : "Expense Updated Successfully", expense:updatedGroup})
  }catch(err)
  {
    console.log(err);
    res.status(500).json({Error : "Internal Server error"})
  }
}