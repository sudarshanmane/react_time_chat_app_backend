import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/envConfig.js";
import { User } from "../../schemas/userSchema.js";
import { AppError } from "./error.js";

export const getActiveUserFromToken = async (token) => {
  if (!token) {
    throw new AppError("Unauthorized", 401);
  }

  const decoded = jwt.verify(token, JWT_SECRET);
  const user = await User.findById(decoded.userId);

  if (!user || user.status !== "active") {
    throw new AppError("Unauthorized", 401);
  }

  return {
    user,
    userId: decoded.userId,
  };
};
