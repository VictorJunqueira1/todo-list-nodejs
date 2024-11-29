import { Task } from '../models/taskModel';

// (CREATE) Criar uma nova tarefa
export const createTask = async (taskData: any): Promise<any> => {
    const task = new Task(taskData);
    await task.save();
    return task;
};

// (READ) Listar todas as tarefas
export const getAllTasks = async (): Promise<any[]> => {
    const tasks = await Task.find();
    return tasks;
};

// (UPTADE) Atualizar o status de uma tarefa
export const updateTask = async (id: string, updateData: any): Promise<any | null> => {
    const task = await Task.findByIdAndUpdate(id, updateData, { new: true });
    return task;
};

// (DELETE) Remover uma tarefa
export const deleteTask = async (id: string): Promise<any | null> => {
    const task = await Task.findByIdAndDelete(id);
    return task;
};