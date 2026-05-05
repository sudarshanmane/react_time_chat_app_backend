import { catchAsync } from "../../common/utils/catchAsync.js";
import { sendSuccessReponse } from "../../common/utils/sendResponse.js";
import { loginUserService, registerUserService } from "./auth.service.js";

export const registerController = catchAsync(async (req, res, next) => {
  let data = req.body;

  let response = await registerUserService(data);

  return sendSuccessReponse(
    res,
    response,
    201,
    "User Successfully registered!",
  );
});

export const loginController = catchAsync(async (req, res, next) => {
  let data = req.body;

  if (!data.email || !data.password) {
    throw new AppError("Email and password are required!", 400);
  }

  let response = await loginUserService(data);

  return sendSuccessReponse(res, response, 200, "User Successfully logged in!");
});
