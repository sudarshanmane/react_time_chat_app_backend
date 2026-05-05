import { userRepository } from "./user.repository.js";

export const getAllUsersService = async (query) => {
  const users = await userRepository.find(query);
  console.log("users---", users);

  return users;
};
