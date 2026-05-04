import { User } from "../../schemas/userSchema.js";

export const authRepository = {
  registerUser: async (user) => {
    return User.insertOne(user);
  },
};
