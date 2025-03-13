import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      type: {
        type: String,
        enum: ['friend_request', 'message', 'group_invite'],
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      isRead: {
        type: Boolean,
        default: false,
      },
}, {timestamps: true})

export const Notification = mongoose.model('Notification', messageSchema)