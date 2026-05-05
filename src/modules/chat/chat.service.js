import { AppError } from "../../common/utils/error.js";
import { chatRepository } from "./chat.repository.js";

export const getChatForUserService = async (chatId, userId) => {
  const chat = await chatRepository.findOne({
    _id: chatId,
    participants: userId,
  });

  if (!chat) {
    throw new AppError("Chat not found", 404);
  }

  return chat;
};

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

export const createGroupChatService = async (currentUser, groupName, participants) => {
  if (!groupName) {
    throw new AppError("Group name is required", 400);
  }

  const participantIds = [
    ...new Set([currentUser, ...participants].map((participant) => String(participant))),
  ];


  const chat = await chatRepository.createOne({
    groupName,
    isGroup: true,
    participants: participantIds,
  });

  return chat;
};

export const getChatsService = async (userId) => {
  const chats = await chatRepository.find(
    {
      participants: userId,
    },
    {
      select: "participants groupName isGroup",
      populate: { path: "participants", select: "name" },
      sort: { updatedAt: -1 },
    },
  );

  return chats.map((chat) => {
    const chatData = chat.toObject();

    return {
      _id: chatData._id,
      groupName: chatData.groupName,
      isGroup: chatData.isGroup,
      participants: chatData.participants.filter(
        (participant) => String(participant._id) !== String(userId),
      ),
    };
  });
};
