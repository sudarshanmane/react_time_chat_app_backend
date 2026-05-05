import jwt from "jsonwebtoken";
import { sendErrorResponse } from "../utils/sendResponse.js";
import { JWT_SECRET } from "../../config/envConfig.js";
import { getActiveUserFromToken } from "../utils/authToken.js";

export const generateToken = (userId) => {
  let token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
};

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.replace("Bearer ", "");
    const { userId } = await getActiveUserFromToken(token);

    req.userId = userId;
    next();
  } catch (error) {
    return sendErrorResponse(res, 401, "Invalid token");
  }
};
