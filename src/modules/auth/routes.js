import { Router } from "express";
import { loginController, registerController } from "./auth.controller.js";
import { validate } from "../../common/middlewares/validate.middleware.js";
import { loginSchema, registerShema } from "../../validations/auth.validate.js";

let authRoutes = Router();
authRoutes.post("/register", validate(registerShema), registerController);
authRoutes.post("/login", validate(loginSchema), loginController);

export default authRoutes;
