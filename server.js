import http from "http";
import { app } from "./app.js";
import { connectDB } from "./src/config/dbConfing.js";
import { PORT } from "./src/config/envConfig.js";
import { initSocket } from "./socket.js";

const startServer = async () => {
  await connectDB();

  const server = http.createServer(app);
  initSocket(server);

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
