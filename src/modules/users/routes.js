import { Router } from "express";
import { getAllUsersController } from "./user.controller.js";
import { verifyToken } from "../../common/middlewares/auth.middleware.js";

const userRouters = Router();
userRouters.get("/", verifyToken, getAllUsersController);

export default userRouters;
