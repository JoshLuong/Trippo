import 'dotenv/config';
import mongoose from 'mongoose';
import express, { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';
import { User } from 'database/models';
import cors from 'cors';
import itineraryRouter from './routes/itineraries';
import googleAuthRouter from './routes/googleAuth';

mongoose.connect(process.env.DATABASE_URL!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  const app = express();
  const session = require('express-session')
  const PORT = process.env.PORT || 4000;

  // TODO: change to secure https://www.npmjs.com/package/express-session
  app.use(session({ resave: true ,secret: '123456' , saveUninitialized: true, cookie: { secure: false }}));
  app.use(async (req: any, res, next) => {
    /* block any bad req/ unlogged in users
    if (req.originalUrl !== "/api/v1/auth/google" && !req.session.userId) {
      return res.send(404);
    }
    */
    const user = await User.findById(req.session.userId).exec();
    req.user = user // you can access req.user anywhere in the API now
    next()
})
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true };
  app.use(cors(corsOptions));

  app.use('/api/itineraries', itineraryRouter);
  app.use('/api/v1/auth', googleAuthRouter)

  app.use((err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
    res.status(err.statusCode || 500).send(err.message);
  });

  app.listen(PORT, () => console.log('Listening on port ' + PORT));
});
