import express from 'express';
import { addTask } from '../controllers/taskController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authenticate, addTask);

export default router;