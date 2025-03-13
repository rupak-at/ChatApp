import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true,
      },
      readBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }],
      type: {
        type: String,
        enum: ['text', 'image', 'video', 'file'],
        default: 'text',
      },
},{timestamps: true})

export const Message = mongoose.model('Message', messageSchema)