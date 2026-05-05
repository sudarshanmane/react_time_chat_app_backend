import { Router } from "express";
import authRoutes from "../modules/auth/routes.js";
import userRouters from "../modules/users/routes.js";
import chatRouter from "../modules/chat/routes.js";
import messageRoute from "../modules/message/route.js";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/users", userRouters);
routes.use("/chats", chatRouter);
routes.use("/messages", messageRoute);
export default routes;
