import 'dotenv/config';
import mongoose from 'mongoose';
import express, { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';
import indexRouter from './routes/index.js';

mongoose.connect(process.env.DATABASE_URL!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to database.');

  const app = express();
  const PORT = process.env.PORT || 4000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/api', indexRouter);

  app.use((err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
    res.status(err.statusCode || 500).send(err.message);
  });

  app.listen(PORT, () => console.log('Listening on port ' + PORT));
});
