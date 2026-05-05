import jwt from "jsonwebtoken";
import { sendErrorResponse } from "../utils/sendResponse.js";
import { JWT_SECRET } from "../../config/envConfig.js";
import { User } from "../../schemas/userSchema.js";

export const generateToken = (userId) => {
  let token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
};

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return sendErrorResponse(res, 401, "Unauthorized");
    }

    let decoded = jwt.verify(token, JWT_SECRET);

    if (decoded) {
      req.userId = decoded.userId;

      let user = await User.findById(req.userId);
      if (!user || user.status !== "active") {
        return sendErrorResponse(res, 401, "Unauthorized");
      }

      next();
    } else {
      return sendErrorResponse(res, 401, "Invalid token");
    }
  } catch (error) {
    return sendErrorResponse(res, 401, "Invalid token");
  }
};
