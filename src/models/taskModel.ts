import { Schema, model, Document } from 'mongoose';

export interface ITask extends Document {
    title: string;
    description?: string;
    status: 'pending' | 'completed';
    createdAt: Date;
    updatedAt: Date;
    user: string;
}

const taskSchema = new Schema<ITask>({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    user: { type: String, required: true },
});

taskSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

export const Task = model<ITask>('Task', taskSchema);