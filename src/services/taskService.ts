import { Task, ITask } from '../models/taskModel';
import { redisService } from '../config/cache/redisService';
import { AppError } from '../errors/AppError';

export const createTask = async (
    userId: string,
    taskData: Partial<ITask>
): Promise<ITask> => {
    const task = new Task({
        ...taskData,
        user: userId,
    });

    const createdTask = await task.save();

    await redisService.delete(`tasks:${userId}`);

    return createdTask;
};

export const getAllTasks = async (userId: string): Promise<ITask[]> => {
    const cacheKey = `tasks:${userId}`;

    const cachedTasks = await redisService.get<ITask[]>(cacheKey);
    if (cachedTasks) {
        return cachedTasks;
    }

    const tasks = await Task.find({ user: userId }).sort({ createdAt: -1 });

    await redisService.set(cacheKey, tasks, 300);

    return tasks;
};

export const updateTask = async (
    id: string,
    updates: Partial<ITask>,
    userId: string
): Promise<ITask> => {
    const { user, createdAt, updatedAt, ...allowedUpdates } = updates;

    const task = await Task.findOneAndUpdate(
        { _id: id, user: userId },
        {
            ...allowedUpdates,
            updatedAt: new Date(),
        },
        {
            new: true,
            runValidators: true,
        }
    );

    if (!task) {
        throw new AppError('Tarefa não encontrada ou não autorizada', 404);
    }

    await redisService.delete(`tasks:${userId}`);

    return task;
};

export const deleteTask = async (
    id: string,
    userId: string
): Promise<void> => {
    const task = await Task.findOneAndDelete({
        _id: id,
        user: userId,
    });

    if (!task) {
        throw new AppError('Tarefa não encontrada ou não autorizada', 404);
    }

    await redisService.delete(`tasks:${userId}`);
};