import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./src/config/envConfig.js";
import { createMessageService } from "./src/modules/message/message.service.js";
import { User } from "./src/schemas/userSchema.js";

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;

      if (!token) {
        return next(new Error("Unauthorized"));
      }

      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.userId);

      if (!user || user.status !== "active") {
        return next(new Error("Unauthorized"));
      }

      socket.userId = decoded.userId;
      next();
    } catch (_error) {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.userId);

    socket.on("join", (chatId) => {
      socket.join(chatId);
    });

    socket.on("typing", (chatId) => {
      socket.to(chatId).emit("typing");
    });

    socket.on("message:send", async (data) => {
      const newMessage = await createMessageService({
        ...data,
        senderId: socket.userId,
      });

      io.to(data.chatId).emit("message:receive", newMessage);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });
  });

  return io;
};
