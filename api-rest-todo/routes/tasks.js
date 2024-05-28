import { Router } from "express";
import { TaskController } from "../controllers/tasks.js";
import { interceptor } from '../middlewares/interceptor.js';

export const tasksRouter = Router();

// GET /tasks/
tasksRouter.get('/', interceptor, TaskController.getAll);
// GET /tasks/:id
tasksRouter.get('/:id', interceptor, TaskController.getById);
// POST /tasks/
tasksRouter.post('/', interceptor, TaskController.create);
// PATCH  /tasks/:id
tasksRouter.patch('/:id', interceptor, TaskController.update);
// DELETE /tasks/:id
tasksRouter.delete('/:id', interceptor, TaskController.delete);