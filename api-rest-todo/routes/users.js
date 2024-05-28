import { Router } from "express";
import { UserController } from "../controllers/users.js";

export const userRouter = Router();

// POST /auth/register
userRouter.post('/register', UserController.register);
userRouter.post('/login', UserController.login);