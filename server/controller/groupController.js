import mongoose from "mongoose";
import { GroupChat } from "../model/groupChatModel.js";
import { User } from "../model/userModel.js";

const createGroup = async (req, res) => {
  try {
    let { name, members } = req.body;

    if (!name || !members) {
      return res.status(400).json({ message: "All Field Are Required" });
    }

    //add admin to group members

    members.push(req.userID);

    if (members.length < 3) {
      return res
        .status(400)
        .json({ message: "Group Should Have Atleast 3 Members" });
    }

    const group = await GroupChat.findOne({ groupName: name });

    if (group) {
      return res.status(409).json({ message: "Group Already Existed" });
    }

    const newGroup = await GroupChat.create({
      groupName: name,
      participants: members,
      groupAdmin: req.userID,
    });

    return res
      .status(201)
      .json({ message: "Group Created Successfully", group: newGroup });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Failure" });
  }
};

const deleteGroup = async (req, res) => {
  try {
    const { groupID } = req.body;

    //check for valid mongodb _id
    if (!mongoose.isValidObjectId(groupID)) {
      return res.status(400).json({ message: "Invalid Group ID" });
    }

    const group = await GroupChat.findOne({ _id: groupID });

    if (!group) {
      return res.status(404).json({ message: "Group Not Found" });
    }
    //if not admin
    if (group.groupAdmin.toString() !== req.userID) {
      return res
        .status(401)
        .json({ message: "Unauthorized Request To Delete Group" });
    }

    await group.deleteOne();

    return res
      .status(200)
      .json({ message: `Group Deleted Successfully ${group.groupName}` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Failure" });
  }
};

const addMember = async (req, res) => {
  try {
    const { groupID, memberID } = req.body;

    if (!groupID || !memberID || memberID.length === 0) {
      return res.status(400).json({ message: "All Field Are Required" });
    }

    //check for valid mongodb _id
    if (!mongoose.isValidObjectId(groupID)) {
      return res.status(400).json({ message: "Invalid Group ID || Member ID" });
    }

    const group = await GroupChat.findById(groupID);
    if (!group) {
      return res.status(404).json({ message: "Group Not Found" });
    }

    if (!group.participants.includes(req.userID)) {
      return res.status(401).json({ message: "You Are Not In The Group" });
    }

    const oldMembers = group.participants;

    const newMembers = memberID.filter((id) => !oldMembers.includes(id));

    group.participants = [...oldMembers, ...newMembers];

    await group.save();

    return res
      .status(200)
      .json({ message: `Member Added Successfully to ${group.groupName}` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Failure" });
  }
};

const removeMember = async (req, res) => {
  try {
    const { groupID, memberID } = req.body;

    if (!groupID || !memberID) {
      return res.status(400).json({ message: "All Field Are Required" });
    }

    //check for valid mongodb _id
    if (
      !mongoose.isValidObjectId(groupID) ||
      !mongoose.isValidObjectId(memberID)
    ) {
      return res.status(400).json({ message: "Invalid Group ID || Member ID" });
    }

    const group = await GroupChat.findById(groupID);

    if (!group) {
      return res.status(404).json({ message: "Group Not Found" });
    }
    //check for admin id so that admin cannot be removed by other member
    if (group.groupAdmin.toString() === memberID) {
      return res.status(401).json({ message: "Admin Cannot Be Removed" });
    }

    const groupMember = group.participants.find(
      (id) => id.toString() === memberID
    );
    if (!groupMember) {
      return res.status(404).json({ message: "Member Not Found In The Group" });
    }

    await group.updateOne({ $pull: { participants: memberID } });

    return res
      .status(200)
      .json({ message: `Member Removed Successfully from ${group.groupName}` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Failure" });
  }
};

const leaveGroup = async (req, res) => {
  try {
    const groupID = req.params.id

    if (!mongoose.isValidObjectId(groupID)) {
      return res.status(400).json({ message: "Invalid Group ID" });
    }

    const group = await GroupChat.findById(groupID);

    if (!group) {
      return res.status(404).json({ message: "Group Not Found" });
    }

    if (!group.participants.includes(req.userID)) {
      return res.status(401).json({ message: "You Are Not In The Group" });
    }

    if (group.groupAdmin.toString() === req.userID.toString()) {
      return res.status(401).json({ message: "Admin Cannot Leave The Group" });
    }

    await group.updateOne({ $pull: { participants: req.userID } });

    return res
      .status(200)
      .json({ message: `You Left The Group ${group.groupName}` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Failure" });
  }
};

const myGroups = async (req, res) => {
  try {
    const groups = await GroupChat.find({ participants: req.userID });
    
    if (groups.length === 0) {
      return res.status(404).json({ message: "No Groups Found" });
    }

    const formattedGroups = groups.map(({groupName, _id}) => ({
      _id,
      groupName,
    }));
    
    return res.status(200).json({ message: "My Groups", groups: formattedGroups });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Failure" });
  }
}

export { createGroup, deleteGroup, addMember, removeMember, leaveGroup, myGroups };
