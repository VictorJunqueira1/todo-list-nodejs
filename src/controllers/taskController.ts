import { Request, Response } from 'express';
import { createTask, updateTask, deleteTask, getAllTasks } from '../services/taskService';

export const addTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const task = await createTask({ ...req.body, user: req.body.userId });
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

export const updateTaskStatus = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedTask = await updateTask(id, { status });
        if (updatedTask) {
            res.status(200).json(updatedTask);
        } else {
            res.status(404).json({ message: 'Tarefa não encontrada' });
        }
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

export const removeTask = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const deletedTask = await deleteTask(id);
        if (deletedTask) {
            res.status(200).json({ message: 'Tarefa removida com sucesso' });
        } else {
            res.status(404).json({ message: 'Tarefa não encontrada' });
        }
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

export const listTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const tasks = await getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({ message: error });
    }
};