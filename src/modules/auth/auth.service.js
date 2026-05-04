import { hashPassword } from "../../common/utils/passwords.js";
import { authRepository } from "./auth.repository.js";

export const registerUserService = async (user) => {
  let hashedPassword = await hashPassword(user.password);
  user.password = hashedPassword;

  return await authRepository.registerUser(user);
};
