import mongoose from "mongoose";
import { GroupChat } from "../model/groupChatModel.js";
import { Message } from "../model/messageModel.js";
import { User } from "../model/userModel.js";
import { uploadOnCloudinaryMutliple } from "../utils/cloudinary.js";

const createGroup = async (req, res) => {
  try {
    let { name, members } = req.body;
    if (!name || !members) {
      return res.status(400).json({ message: "All Field Are Required" });
    }
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

    //to send data through socket
    const populatedGroup = await GroupChat.findById(newGroup._id)
      .populate({
        path: "participants",
        select: "-password -refreshToken",
      })
      .lean();

    const avatar = [
      populatedGroup.participants[0]?.avatar,
      populatedGroup.participants[1]?.avatar,
      populatedGroup.participants[2]?.avatar,
    ];

    const groupData = {
      chatId: populatedGroup._id.toString(),
      group: { ...populatedGroup, avatar },
      lastMessage: null,
    };

    const io = req.app.get("io");
    const onlineUser = global.onlineUser;
    // console.log(onlineUser);
    members.forEach((memberId) => {
      if (memberId !== req.userID) {
        const socketId = onlineUser[memberId];
        if (socketId) {
          io.emit("new-group-creation", groupData);
          // console.log(groupData);
          // console.log("Emitting new group creation");
        }
      }
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
    const groupID = req.params.id;

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

    const allMessages = await Message.find({ chatId: groupID });

    if (allMessages.length > 0) {
      await Message.deleteMany({ chatId: groupID });
    }

    await group.deleteOne();

    const io = req.app.get("io");

    io.emit("group-deleted", groupID);

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

    if (memberID.some((id) => group.participants.includes(id))) {
      return res.status(400).json({ message: "Member Already In The Group" });
    };

    const newMembersInfo = await User.find({ _id: { $in: memberID } }).select(
      "-password -refreshToken"
    );

    if (newMembersInfo.length !== memberID.length) {
      return res.status(400).json({ message: "Invalid Member ID" });
    }

    const userNames = newMembersInfo.map((user) => user.username);

    const oldMembers = group.participants;

    const newMembers = memberID.filter((id) => !oldMembers.includes(id));

    group.participants = [...oldMembers, ...newMembers];

    await group.save();

    //to send data through socket
    const populatedGroup = await GroupChat.findById(groupID)
      .populate({
        path: "participants",
        select: "-password -refreshToken",
      })
      .lean();

    const avatar = [
      populatedGroup.participants[0]?.avatar,
      populatedGroup.participants[1]?.avatar,
      populatedGroup.participants[2]?.avatar,
    ];

    const groupData = {
      chatId: populatedGroup._id.toString(),
      group: { ...populatedGroup, avatar },
      lastMessage: { content: "Start Chat In New Group" },
    };
    console.log(populatedGroup._id.toString());

    const io = req.app.get("io");
    io.emit("member-added", groupData);


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

    const io = req.app.get("io");
    io.emit("member-removed", {groupID, memberID});

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
    const groupID = req.params.id;

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

    const formattedGroups = groups.map(({ groupName, _id }) => ({
      _id,
      groupName,
    }));

    return res
      .status(200)
      .json({ message: "My Groups", groups: formattedGroups });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Failure" });
  }
};

const myMessages = async (req, res) => {
  try {
    const groupId = req.params.id;

    const group = await GroupChat.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group Not Found" });
    }

    if (!group.participants.includes(req.userID)) {
      return res.status(401).json({ message: "You Are Not In The Group" });
    }

    const messages = await Message.find({
      chatId: groupId,
      chatType: "GroupChat",
    }).populate("sender");

    if (messages.length === 0) {
      return res
        .status(404)
        .json({ message: `No Messages Found in ${group.groupName}` });
    }

    const formattedMessages = messages.map(
      ({ sender, content, createdAt, file }) => ({
        sender: sender.username,
        senderId: sender._id,
        file,
        content,
        createdAt,
      })
    );

    return res
      .status(200)
      .json({ Group: group.groupName, messages: formattedMessages });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Failure" });
  }
};

const sendMessage = async (req, res) => {
  try {
    const chatId = req.params.id;
    console.log(req.files);
    const filesPath = req.files?.map((file) => file.path);

    if (!mongoose.isValidObjectId(chatId)) {
      return res.status(400).json({ message: "Invalid Group ID" });
    }

    const group = await GroupChat.findById(chatId);

    if (!group) {
      return res.status(404).json({ message: "Group Not Found | Deleted" });
    }

    if (!group.participants.includes(req.userID)) {
      return res.status(401).json({ message: "You Are Not In The Group" });
    }
    let uploadedFileURL;
    if (filesPath.length !== 0) {
      const { uploadedFile } = await uploadOnCloudinaryMutliple(filesPath);
      uploadedFileURL = uploadedFile;
    }

    const message = await Message.create({
      sender: req.userID,
      content: req.body.content,
      file: uploadedFileURL,
      chatId,
      chatType: "GroupChat",
    });

    const senderUser = await User.findById(req.userID);

    const formattedMessage = {
      sender: senderUser?.username,
      senderId: senderUser?._id,
      avatar: senderUser.avatar,
      content: message.content,
      file: message.file || [],
      createdAt: message.createdAt,
      chatId,
    };

    const io = req.app.get("io");
    io.to(chatId).emit("receive-message", formattedMessage);

    return res.status(200).json({
      message: "Message Sent Successfully",
      sendMessage: formattedMessage,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Failure" });
  }
};

export {
  createGroup,
  deleteGroup,
  addMember,
  removeMember,
  leaveGroup,
  myGroups,
  myMessages,
  sendMessage,
};
