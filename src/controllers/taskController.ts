import { Request, Response } from 'express';
import { createTask, getAllTasks, updateTask, deleteTask } from '../services/taskService';
import { redisService } from '../config/cache/redisService';
import { created, internalServerError, notFound, ok } from '../utils/apiResponse';

export const addTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const task = await createTask({ ...req.body, user: req.body.userId });

        await redisService.delete(`tasks:${req.body.userId}`);

        created(res, 'Tarefa criada com sucesso', task);
    } catch (error) {
        console.error(error);
        internalServerError(res, 'Erro ao criar a tarefa');
    }
};

export const listTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const cacheKey = `tasks:${req.body.userId}`;

        const cachedTasks = await redisService.get(cacheKey);
        if (cachedTasks) {
            ok(res, 'Tarefas listadas com sucesso', cachedTasks);
            return;
        }

        const tasks = await getAllTasks(req.body.userId);

        await redisService.set(cacheKey, tasks, 300);

        ok(res, 'Tarefas listadas com sucesso', tasks);
    } catch (error) {
        console.error(error);
        internalServerError(res, 'Erro ao listar tarefas');
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
            notFound(res, 'Tarefa não encontrada ou não autorizada');
            return;
        }

        await redisService.delete(`tasks:${userId}`);

        ok(res, 'Tarefa atualizada com sucesso', task);
    } catch (error) {
        console.error(error);
        internalServerError(res, 'Erro ao atualizar a tarefa');
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
            notFound(res, 'Tarefa não encontrada ou não autorizada');
            return;
        }

        await redisService.delete(`tasks:${userId}`);

        ok(res, 'Tarefa excluída com sucesso');
    } catch (error) {
        console.error(error);
        internalServerError(res, 'Erro ao excluir a tarefa');
    }
};