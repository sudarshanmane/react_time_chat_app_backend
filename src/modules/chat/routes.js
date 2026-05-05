import { Router } from "express";
import {
  createGroupChatController,
  createOrGetChatController,
  getChatsController,
} from "./chat.controller.js";
import { verifyToken } from "../../common/middlewares/auth.middleware.js";

const chatRouter = Router();

chatRouter.post("/", verifyToken, createOrGetChatController);
chatRouter.post("/group", verifyToken, createGroupChatController);
chatRouter.get("/all", verifyToken, getChatsController);

export default chatRouter;
