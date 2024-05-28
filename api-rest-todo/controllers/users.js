import { User } from '../models/user.js';
import { validatePartialUser, validateUser } from '../schemas/users.js';

export class UserController {

  static async register(req, res) {
    try {
      const result = validateUser(req.body);
      if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) });
      }
      const { email } = result.data;
      const isExistUser = await User.findByEmail(email);
      if (isExistUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      const newUser = await User.register({ input: result.data });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({
        error: 'Error creating user ' + error.message
      });
    } 
  }

  static async login(req, res) {
    try {
      const result = validatePartialUser(req.body);
      if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) });
      }
      const { email, password } = req.body;
      const loggedUser = await User.login({ email, password });
      if (!loggedUser) {
        return res.status(401).send({ message: 'Invalid credentials' });
      }
      res.status(200).send(loggedUser);
    } catch (error) {
      res.status(500).json({
        error: 'Error logging user'
      });
    }
  }

}