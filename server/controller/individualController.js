import mongoose from "mongoose";
import { Message } from "../model/messageModel.js";
import { IndividualChat } from "../model/singleChatModel.js";

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
      ({ sender, content, createdAt }) => ({
        sender: sender._id.toString() === req.userID ? "You" : sender.username,
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

    await friend.deleteOne();

    return res.status(200).json({ message: "Friend Disconnected Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Failure" });
  }
};

const sendMessage = async (req, res) => {
  try {
    
    const {chatId} = req.params

    if (!mongoose.isValidObjectId(chatId)) {
      return res.status(400).json({message: "Invalid Friend ID"})
    }

    const friend = await IndividualChat.findById(chatId)
    if (!friend) {
      return res.status(404).json({message: "Friend Not Found"})
    }

    if (!friend.participants.includes(req.userID)) {
      return res.status(401).json({message: "You Are Not In The Friend List"})
    }

    const message = await Message.create({
      sender: req.userID,
      content: req.body.content,
      chatId,
      chatType: "IndividualChat"
    })

    const formattedMessage = {
      sender: "You",
      content: message.content,
      createdAt: message.createdAt,
    };

    return res.status(200).json({message: "Message Sent Successfully", sendMessage: formattedMessage})
    
  } catch (error) {
    console.error(error)
    return res.status(500).json({message: "Internal Failure"})
  }
};

export { getMyMessages, disconnectFriend, sendMessage };
