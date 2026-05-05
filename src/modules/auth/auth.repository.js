import { User } from "../../schemas/userSchema.js";
import { baseRepository } from "../repository/baseRepository.js";

export const authRepository = {
  model: User,
  ...baseRepository,
  async findUserByEmail(email, selectPassword = false) {
    let query = User.findOne({ email });
    if (selectPassword) {
      query = query.select("+password");
    }
    return query;
  },
};
