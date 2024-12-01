import { Task, ITask } from '../models/taskModel';

export const createTask = async (taskData: Partial<ITask>): Promise<ITask> => {
    const task = new Task(taskData);
    return task.save();
};

export const getAllTasks = async (userId: string): Promise<ITask[]> => {
    return Task.find({ user: userId }).sort({ createdAt: -1 });
};

export const updateTask = async (id: string, updates: Partial<ITask>, userId: string): Promise<ITask | null> => {
    return Task.findOneAndUpdate({ id: id, user: userId }, updates, { new: true });
};

export const deleteTask = async (id: string, userId: string): Promise<ITask | null> => {
    return Task.findOneAndDelete({ id: id, user: userId });
};