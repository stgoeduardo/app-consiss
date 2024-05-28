import { Task } from '../models/task.js';
import { validatePartialTask, validateTask } from '../schemas/tasks.js';

export class TaskController {
  static async getAll(req, res) {
    try {
      const user = req.user.id;
      const tasks = await Task.getAll({ user });
      res.status(200).json(tasks)
    } catch (error) {
      res.status(500).json({
        error: 'Error getting all tasks'
      });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const task = await Task.getById({ id });
      if (task.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Not authorized to get by id this task' });
      }
      return task
        ? res.status(200).json(task)
        : res.status(404).json({ message: 'Task not found' })
    } catch (error) {
      res.status(500).json({
        error: 'Error getting task'
      });
    }
  }

  static async create(req, res) {
    try {
      const result = validateTask(req.body);
      if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) });
      }
      const input = {
        user: req.user.id,
        ...result.data
      };
      const newTask = await Task.create({ input });
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({
        error: 'Error creating task: ' + error?.message
      });
    }
  }

  static async update (req, res) {
    try {
      const result = validatePartialTask(req.body);
      if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) });
      }
      const { id } = req.params;
      const task = await Task.getById({ id });
      if (task.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Not authorized to update this task' });
      }
      const updatedTask = await Task.update({ id, input: result.data });
      res.status(200).json(updatedTask);
    } catch (err) {
      res.status(500).json({
        error: 'Error updating task'
      });      
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const task = await Task.getById({ id });
      if (task.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Not authorized to delete this task' });
      }
      const result = await Task.delete({ id });
      if (!result) {
        return res.status(404).json({ message: 'Task not found' })
      }
      res.status(200).json({ message: 'Task deleted' })
    } catch(err) {
      res.status(500).json({
        error: 'Error deleting task'
      });
    }
  }

}