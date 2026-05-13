import { Request, Response } from 'express';
import { createTask, deleteTask, getAllTasks, updateTask } from '../services/taskService';
import { sendSuccess } from '../utils/apiResponse';

type TaskParams = {
    id: string;
};

export const addTask = async (req: Request, res: Response): Promise<void> => {
    const task = await createTask(req.body.userId, req.body);

    sendSuccess(res, 201, 'Tarefa criada com sucesso', task);
};

export const listTasks = async (req: Request, res: Response): Promise<void> => {
    const tasks = await getAllTasks(req.body.userId);

    sendSuccess(res, 200, 'Tarefas listadas com sucesso', tasks);
};

export const editTask = async (
    req: Request<TaskParams>,
    res: Response
): Promise<void> => {
    const { id } = req.params;

    const task = await updateTask(id, req.body, req.body.userId);

    sendSuccess(res, 200, 'Tarefa atualizada com sucesso', task);
};

export const removeTask = async (
    req: Request<TaskParams>,
    res: Response
): Promise<void> => {
    const { id } = req.params;

    await deleteTask(id, req.body.userId);

    sendSuccess(res, 200, 'Tarefa excluída com sucesso');
};