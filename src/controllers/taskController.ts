import { Request, Response } from 'express';
import { createTask, getAllTasks, updateTask, deleteTask } from '../services/taskService';
import { redisService } from '../config/cache/redisService';

export const addTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const task = await createTask({ ...req.body, user: req.body.userId });

        await redisService.delete(`tasks:${req.body.userId}`);

        res.status(201).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar a tarefa' });
    }
};

export const listTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const cacheKey = `tasks:${req.body.userId}`;

        const cachedTasks = await redisService.get(cacheKey);
        if (cachedTasks) {
            res.status(200).json(cachedTasks);
            return;
        }

        const tasks = await getAllTasks(req.body.userId);

        await redisService.set(cacheKey, tasks, 300);

        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao listar tarefas' });
    }
};

export const editTask = async (
    req: Request<{ id: string }>,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const { userId, user, createdAt, updatedAt, ...updates } = req.body;

        const task = await updateTask(id, updates, userId);

        if (!task) {
            res.status(404).json({ message: 'Tarefa não encontrada ou não autorizada' });
            return;
        }

        await redisService.delete(`tasks:${userId}`);

        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar a tarefa' });
    }
};

export const removeTask = async (
    req: Request<{ id: string }>,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        const task = await deleteTask(id, userId);

        if (!task) {
            res.status(404).json({ message: 'Tarefa não encontrada ou não autorizada' });
            return;
        }

        await redisService.delete(`tasks:${userId}`);

        res.status(200).json({ message: 'Tarefa excluída com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao excluir a tarefa' });
    }
};