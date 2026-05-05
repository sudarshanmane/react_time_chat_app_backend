import { User } from "../../schemas/userSchema.js";
import { baseRepository } from "../repository/baseRepository.js";

export const userRepository = {
  model: User,
  ...baseRepository,
  findByEmail: async (email) => {
    return this.model.findOne({
      email,
    });
  },
};
