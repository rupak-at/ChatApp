import mongoose from "mongoose";
import { Message } from "../model/messageModel.js";
import { IndividualChat } from "../model/singleChatModel.js";
import { User } from "../model/userModel.js";
import { FriendRequest } from "../model/friendRequestModel.js";
import { uploadOnCloudinaryMutliple } from "../utils/cloudinary.js";

const getMyMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    const messages = await Message.find({
      chatId,
      chatType: "IndividualChat",
    }).populate("sender");

    if (messages.length === 0) {
      return res.status(404).json({ message: "No Messages Found" });
    }

    const formattedMessages = messages.map(
      ({ sender, content, createdAt, file }) => ({
        sender: sender._id.toString() === req.userID ? "You" : sender.username,
        senderId: sender._id,
        avatar: sender.avatar,
        file,
        content,
        createdAt,
      })
    );

    return res.status(200).json({ messages: formattedMessages });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Failure" });
  }
};

const disconnectFriend = async (req, res) => {
  try {
    const { chatId } = req.params;

    if (!mongoose.isValidObjectId(chatId)) {
      return res.status(400).json({ message: "Invalid Friend ID" });
    }

    const friend = await IndividualChat.findById(chatId);
    if (!friend) {
      return res.status(404).json({ message: "Friend Not Found" });
    }

    if (!friend.participants.includes(req.userID)) {
      return res
        .status(401)
        .json({ message: "You Are Not In The Friend List" });
    }

    const userIds = friend.participants?.map((id) => id.toString());
    //delete from request as well
    await FriendRequest.deleteOne({ $or: [{ sender: userIds[0], receiver: userIds[1] }, { sender: userIds[1], receiver: userIds[0] }] });

    await friend.deleteOne();
    //remove all messages as well
    await Message.deleteMany({ chatId: chatId });

    //socket
    const io = req.app.get("io");
    io.emit("unfriend", chatId);

    return res
      .status(200)
      .json({ message: "Friend Disconnected Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Failure" });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const filesPath = req?.files?.map((file) => file.path);

    if (!mongoose.isValidObjectId(chatId)) {
      return res.status(400).json({ message: "Invalid Friend ID" });
    }

    const friend = await IndividualChat.findById(chatId);
    if (!friend) {
      return res.status(404).json({ message: "Friend Not Found" });
    }

    if (!friend.participants.includes(req.userID)) {
      return res
        .status(401)
        .json({ message: "You Are Not In The Friend List" });
    }

    let uploadedFileURL;
    if (filesPath.length !==0){
      const {uploadedFile} = await  uploadOnCloudinaryMutliple(filesPath);
      uploadedFileURL = uploadedFile
    }
    const senderUser = await User.findById(req.userID);

    const message = await Message.create({
      sender: req.userID,
      content: req.body.content,
      file:uploadedFileURL || [],
      chatId,
      chatType: "IndividualChat",
    });

    const formattedMessage = {
      sender: senderUser.username,
      senderId: senderUser._id,
      avatar: senderUser.avatar,
      content: message.content,
      file: message.file,
      createdAt: message.createdAt,
      chatId: chatId,
    };
    //emit message to chatRoom
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

export { getMyMessages, disconnectFriend, sendMessage };
