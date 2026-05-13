import express from 'express';
import { addTask, editTask, listTasks, removeTask } from '../controllers/taskController';
import { authenticate } from '../middlewares/authMiddleware';
import { asyncHandler } from '../middlewares/asyncHandler';
import { validateRequest } from '../middlewares/validateRequest';
import { createTaskSchema, taskParamsSchema, updateTaskSchema } from '../validations/taskValidation';

const router = express.Router();

router.post(
    '/',
    validateRequest({ body: createTaskSchema }),
    asyncHandler(authenticate),
    asyncHandler(addTask)
);

router.get(
    '/',
    asyncHandler(authenticate),
    asyncHandler(listTasks)
);

router.put(
    '/:id',
    validateRequest({
        params: taskParamsSchema,
        body: updateTaskSchema,
    }),
    asyncHandler(authenticate),
    asyncHandler(editTask)
);

router.delete(
    '/:id',
    validateRequest({ params: taskParamsSchema }),
    asyncHandler(authenticate),
    asyncHandler(removeTask)
);

export default router;