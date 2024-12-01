import express from 'express';
import { addTask, listTasks, editTask, removeTask } from '../controllers/taskController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/tasks', authenticate, addTask);
router.get('/tasks', authenticate, listTasks);
router.put('/tasks/:id', authenticate, editTask);
router.delete('/tasks/:id', authenticate, removeTask);

export default router;