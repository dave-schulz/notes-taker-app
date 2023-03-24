import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';

import NoteRoutes from './routes/notes.route';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/notes', NoteRoutes);

app.use((req, res, next) => {
  next(Error('Endpoint not found'));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  let errorMessage = 'An unknown error occurred';

  if (error instanceof Error) {
    errorMessage = error.message;
  }
  res.status(500).json({ message: errorMessage });
});

export default app;
