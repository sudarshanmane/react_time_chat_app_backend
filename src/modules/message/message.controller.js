import { catchAsync } from "../../common/utils/catchAsync.js";
import { sendSuccessReponse } from "../../common/utils/sendResponse.js";
import {
  createMessageService,
  getMessageService,
} from "./message.service.js";

export const createMessageController = catchAsync(async (req, res) => {
  const message = await createMessageService(req.body, req.userId);

  return sendSuccessReponse(
    res,
    message,
    201,
    "Message created successfully!",
  );
});

export const getMessagecontroller = catchAsync(async (req, res) => {
  const chatId = req.params.chatId;
  const messages = await getMessageService(chatId, req.userId);

  return sendSuccessReponse(
    res,
    messages,
    200,
    "Messages fetched successfully!",
  );
});
