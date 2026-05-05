import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./src/routes/router.js";
import { errorMiddleware } from "./src/common/middlewares/errorHandlers.js";
import { AppError } from "./src/common/utils/error.js";

export const app = express();

app.use(cors("*"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use(
  "/api",
  (req, _res, next) => {
    console.log(req.originalUrl);
    next();
  },
  routes,
);

app.use("/", (req, res) => {
  throw new AppError("Path not found!", 400);
});

app.use(errorMiddleware);
