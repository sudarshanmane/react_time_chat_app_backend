import { Chat } from "../../schemas/chatSchema.js";
import { baseRepository } from "../repository/baseRepository.js";

export const chatRepository = {
  model: Chat,
  ...baseRepository,
};
