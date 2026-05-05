import { generateToken } from "../../common/middlewares/auth.middleware.js";
import { AppError } from "../../common/utils/error.js";
import { comparePassword, hashPassword } from "../../common/utils/passwords.js";
import { authRepository } from "./auth.repository.js";

export const registerUserService = async (user) => {
  let hashedPassword = await hashPassword(user.password);
  user.password = hashedPassword;
  return await authRepository.createOne(user);
};

export const loginUserService = async (user) => {
  let existingUser = await authRepository.findUserByEmail(user.email, true);

  if (!existingUser) {
    throw new AppError("Invalid credentials!", 400);
  } 

  let isMatch = await comparePassword(user.password, existingUser.password);

  if (!isMatch) {
    throw new AppError("Invalid credentials!", 400);
  }

  const token = generateToken(existingUser._id);

  return {
    token,
    user: {
      email: existingUser.email,
      name: existingUser.name,
      id: existingUser._id,
    },
  };
};
