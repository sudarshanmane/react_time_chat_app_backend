import { Router } from "express";
import { register } from "./auth.controller.js";
import { validate } from "../../common/middlewares/validate.middleware.js";
import { registerShema } from "../../validations/auth.validate.js";

let authRoutes = Router();
authRoutes.post("/register", validate(registerShema), register);

export default authRoutes;