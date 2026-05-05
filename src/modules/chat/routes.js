import { Router } from "express";
import {
  createOrGetChatController,
  getChatsController,
} from "./chat.controller.js";

const chatRouter = Router();

chatRouter.get("/", createOrGetChatController);
chatRouter.get("/all", getChatsController);

export default chatRouter;
