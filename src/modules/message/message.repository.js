import { Message } from "../../schemas/messageSchema.js";
import { baseRepository } from "../repository/baseRepository.js";

export const messageRepository = {
  model: Message,
  ...baseRepository,
};
