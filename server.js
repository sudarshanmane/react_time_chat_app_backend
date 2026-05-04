import { app } from "./app.js";
import { connectDB } from "./src/config/dbConfing.js";
import { PORT } from "./src/config/envConfig.js";

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
