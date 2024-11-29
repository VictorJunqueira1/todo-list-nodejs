import { Task } from '../models/taskModel';

export const createTask = async (taskData: any): Promise<any> => {
    const task = new Task(taskData);
    await task.save();
    return task;
};

export const getAllTasks = async (): Promise<any[]> => {
    const tasks = await Task.find();
    return tasks;
};

export const updateTask = async (id: string, updateData: any): Promise<any | null> => {
    const task = await Task.findByIdAndUpdate(id, updateData, { new: true });
    return task;
};

export const deleteTask = async (id: string): Promise<any | null> => {
    const task = await Task.findByIdAndDelete(id);
    return task;
};