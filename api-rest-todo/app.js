// imports
import express, { json } from 'express';
import { corsMiddleware } from './middlewares/cors.js'
import { connectDB } from './config/db.js';
import { tasksRouter } from './routes/tasks.js';
import { userRouter } from './routes/users.js';

// declarations
const PORT = process.env.PORT ?? 3000;
const app = express();

// middlewares
app.use(json());
app.use(corsMiddleware())
app.disable('x-powered-by');

// connection to Mongo DataBase
connectDB();

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Server Ok!' })
});
app.use('/api/v1/auth', userRouter);
app.use('/api/v1/tasks', tasksRouter);

// Create server and listening
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
