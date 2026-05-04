import { User } from "../../schemas/userSchema.js";

export const authRepository = {
  registerUser: async (user) => {
    return await User.insertOne(user);
  },
};
