import { Router } from "express";
import {
  createMessageController,
  getMessagecontroller,
} from "./message.controller.js";
import { verifyToken } from "../../common/middlewares/auth.middleware.js";

const messageRoute = Router();
messageRoute.post("/", verifyToken, createMessageController);
messageRoute.get("/:chatId", verifyToken, getMessagecontroller);
export default messageRoute;
