import { userRepository } from "./user.repository.js";

export const getAllUsersService = async (query) => {
  const search = query.name || query.search || "";
  const users = await userRepository.find(
    {
      status: "active",
      name: { $regex: search, $options: "i" },
    },
    {
      select: "name email",
      sort: { name: 1 },
      limit: 20,
    },
  );

  return users;
};
