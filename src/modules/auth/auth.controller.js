import { catchAsync } from "../../common/catchAsync.js";
import { sendSuccessReponse } from "../../common/sendResponse.js";
import { registerUserService } from "./auth.service.js";

export const register = catchAsync(async (req, res, next) => {
  let data = req.body;

  let response = await registerUserService(data);
  return sendSuccessReponse(
    res,
    response,
    201,
    "User Successfully registered!",
  );
});
