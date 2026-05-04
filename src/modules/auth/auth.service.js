import { authRepository } from "./auth.repository.js";

export const registerUserService = async (user) => {
  return await authRepository.registerUser(user);
};
