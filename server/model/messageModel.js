import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
    },
    file:[
      {
        type: Object,
      }
    ],
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "chatType", 
    },
    chatType: {
      type: String,
      required: true,
      enum: ["GroupChat", "IndividualChat"], 
    },
    readBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);