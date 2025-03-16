import mongoose from "mongoose";

const singleChatSchema = new mongoose.Schema({
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      }
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
      }
    ]
}, {timestamps: true})

export const IndividualChat = mongoose.model('IndividualChat', singleChatSchema);