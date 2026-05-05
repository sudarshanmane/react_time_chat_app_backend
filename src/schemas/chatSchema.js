import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isGroup: {
      type: Boolean,
      default: false,
    },
    groupName: String,
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  { timestamps: true },
);

chatSchema.index({ participants: 1, updatedAt: -1 });
chatSchema.index({ isGroup: 1, participants: 1 });

export const Chat = mongoose.model("Chat", chatSchema);
