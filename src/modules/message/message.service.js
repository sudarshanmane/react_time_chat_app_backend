import { messageRepository } from "./message.repository.js";

export const createMessageService = async (data) => {
  const message = await messageRepository.createOne(data);

  return message;
};

export const getMessageService = async (chatId) => {
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
