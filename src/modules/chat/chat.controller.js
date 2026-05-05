import { catchAsync } from "../../common/utils/catchAsync.js";
import { sendSuccessReponse } from "../../common/utils/sendResponse.js";
import {
  createGroupChatService,
  createOrGetChatService,
  getChatsService,
} from "./chat.service.js";

export const createOrGetChatController = catchAsync(async (req, res) => {
  const { userId } = req.body;
  const currentUser = req.userId;

  const chat = await createOrGetChatService(currentUser, userId);
  return sendSuccessReponse(res, chat, 200, "Chat fetched successfully!");
});

export const createGroupChatController = catchAsync(async (req, res) => {
  const { groupName, participants } = req.body;
  const currentUser = req.userId;

  const chat = await createGroupChatService(
    currentUser,
    groupName,
    participants,
  );

  return sendSuccessReponse(res, chat, 201, "Group created successfully!");
});

export const getChatsController = catchAsync(async (req, res) => {
  const userId = req.userId;

  let chats = await getChatsService(userId);
  return sendSuccessReponse(res, chats, 200, "Chats fetched successfully!");
});
