import express from 'express';
import { addTask, listTasks, editTask, removeTask } from '../controllers/taskController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authenticate, addTask);
router.get('/', authenticate, listTasks);
router.put('/:id', authenticate, editTask);
router.delete('/:id', authenticate, removeTask);

export default router;