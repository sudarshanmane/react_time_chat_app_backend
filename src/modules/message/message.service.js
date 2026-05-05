import { AppError } from "../../common/utils/error.js";
import { chatRepository } from "../chat/chat.repository.js";
import { getChatForUserService } from "../chat/chat.service.js";
import { messageRepository } from "./message.repository.js";

export const createMessageService = async (data, senderId) => {
  const { chatId, message } = data;

  if (!chatId || !message) {
    throw new AppError("chatId and message are required", 400);
  }

  await getChatForUserService(chatId, senderId);

  const createdMessage = await messageRepository.createOne({
    chatId,
    senderId,
    message,
  });

  await chatRepository.updateOne(
    { _id: chatId },
    { lastMessage: createdMessage._id },
  );

  return createdMessage;
};

export const getMessageService = async (chatId, userId) => {
  await getChatForUserService(chatId, userId);

  const messages = await messageRepository.find(
    {
      chatId,
    },
    {
      sort: { createdAt: 1 },
    },
  );

  return messages;
};
