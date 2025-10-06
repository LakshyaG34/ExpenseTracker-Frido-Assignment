import Group from "../models/group.model.js";

export const createGroup = async(req, res) =>{
    try{
        const {name, membersIdArr, createdByUserId} = req.body;
        if(!name || !membersIdArr || !Array.isArray(membersIdArr) || membersIdArr.length == 0 || !createdByUserId)
        {
            res.status(404).json({err : "Missing Fields"})
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
        const {name} = req.body;
        const group = await Group.findOne({ name })
        .populate("members", "name email")
        .populate("createdBy", "name email");
        if(!group)
        {
            res.status(404).json({err : "Group does not exist"})
        }
        res.status(200).json(group);
    }catch(err)
    {
        console.log(err);
    }
}