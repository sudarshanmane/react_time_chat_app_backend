import { Server } from "socket.io";
import { getActiveUserFromToken } from "./src/common/utils/authToken.js";
import { getChatForUserService } from "./src/modules/chat/chat.service.js";
import { createMessageService } from "./src/modules/message/message.service.js";

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      const { user, userId } = await getActiveUserFromToken(token);

      socket.userId = userId;
      socket.userName = user.name;
      next();
    } catch (_error) {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    socket.on("join", async (chatId, callback) => {
      try {
        await getChatForUserService(chatId, socket.userId);

        socket.join(chatId);
        callback?.({ success: true });
      } catch (error) {
        callback?.({
          success: false,
          message: error.message || "Could not join chat",
        });
      }
    });

    socket.on("typing", async (chatId, callback) => {
      try {
        await getChatForUserService(chatId, socket.userId);

        socket.to(chatId).emit("typing", {
          chatId,
          userId: socket.userId,
          name: socket.userName,
        });
        callback?.({ success: true });
      } catch (error) {
        callback?.({
          success: false,
          message: error.message || "Could not send typing event",
        });
      }
    });

    socket.on("message:send", async (data, callback) => {
      try {
        const newMessage = await createMessageService(data, socket.userId);

        io.to(data.chatId).emit("message:receive", newMessage);
        callback?.({ success: true, data: newMessage });
      } catch (error) {
        callback?.({
          success: false,
          message: error.message || "Message could not be sent",
        });
      }
    });
  });

  return io;
};
