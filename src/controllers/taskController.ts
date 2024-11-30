import { Request, Response } from 'express';
import { createTask, getAllTasks, updateTask, deleteTask } from '../services/taskService';

export const addTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const task = await createTask({ ...req.body, user: req.body.userId });
        res.status(201).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar a tarefa' });
    }
};

export const listTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const tasks = await getAllTasks(req.body.userId);
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao listar tarefas' });
    }
};

export const editTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, ...updates } = req.body;
        const task = await updateTask(id, updates, req.body.userId);
        if (!task) {
            res.status(404).json({ message: 'Tarefa não encontrada ou não autorizada' });
            return;
        }
        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar a tarefa' });
    }
};

export const removeTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.body;
        const task = await deleteTask(id, req.body.userId);
        if (!task) {
            res.status(404).json({ message: 'Tarefa não encontrada ou não autorizada' });
            return;
        }
        res.status(200).json({ message: 'Tarefa excluída com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao excluir a tarefa' });
    }
};