import { catchAsync } from "../../common/utils/catchAsync.js";
import { sendSuccessReponse } from "../../common/utils/sendResponse.js";
import { getAllUsersService } from "./user.service.js";

export const getAllUsersController = catchAsync(async (req, res) => {
  const users = await getAllUsersService(req.query);
  return sendSuccessReponse(res, users, 200, "Users fetched successfully!");
});
