import express from 'express';
import { addTask, editTask, listTasks, removeTask } from '../controllers/taskController';
import { authenticate } from '../middlewares/authMiddleware';
import { asyncHandler } from '../middlewares/asyncHandler';

const router = express.Router();

router.post('/', authenticate, asyncHandler(addTask));
router.get('/', authenticate, asyncHandler(listTasks));
router.put('/:id', authenticate, asyncHandler(editTask));
router.delete('/:id', authenticate, asyncHandler(removeTask));

export default router;