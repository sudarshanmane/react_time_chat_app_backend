import { Chat } from "../../schemas/chatSchema.js";
import { chatRepository } from "./chat.repository.js";

export const createOrGetChatService = async (currentUser, userId) => {
  let chat = await chatRepository.findOne({
    isGroup: false,
    participants: { $all: [currentUser, userId] },
  });

  if (!chat) {
    chat = await chatRepository.createOne({
      participants: [currentUser, userId],
    });
  }

  return chat;
};

export const getChatsService = async (userId) => {
  const chats = await chatRepository.find(
    {
      participants: userId,
    },
    {
      populate: [
        { path: "participants", select: "-password" },
        { path: "lastMessage" },
      ],
      sort: { updatedAt: -1 },
    },
  );

  return chats;
};
