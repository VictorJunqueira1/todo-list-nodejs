import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
import { corsOptions } from './config/security';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: '10kb' }));

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.use(errorHandler);

export default app;