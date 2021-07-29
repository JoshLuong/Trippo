import 'dotenv/config';
import mongoose from 'mongoose';
import express, { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';
import { User } from 'database/models';
import cors from 'cors';
import session from 'express-session';
import itineraryRouter from './routes/itineraries';
import googleAuthRouter from './routes/googleAuth';
import yelpFusionRouter from './routes/yelpFusion';

mongoose.connect(process.env.DATABASE_URL!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  const app = express();
  const PORT = process.env.PORT || 4000;

  // TODO: change to secure https://www.npmjs.com/package/express-session
  app.use(session({ resave: true, secret: process.env.EXPRESS_SESSION_SECRET!, saveUninitialized: true, cookie: { secure: false }}));

  app.use(async (req: any, res, next) => {
    const user = await User.findById(req.session.userId).exec();
    // TODO if user is logged out, response should be 404
    if (req.originalUrl !== "/api/v1/auth/google" && req.originalUrl !== "/api/v1/auth/logout" && req.method !== "OPTIONS" && !user) {
      res.status(404).send('User not found')
      return next('invalid user');
    }
    req.user = user // you can access req.user anywhere in the API now
    next()
})

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  const corsOptions = {
    origin: process.env.ORIGIN,
    credentials: true,
    preflightContinue: false };
  app.use(cors(corsOptions));

  app.use('/api/itineraries', itineraryRouter);
  app.use('/api/v1/auth', googleAuthRouter)
  app.use('/api/yelp', yelpFusionRouter);

  app.use((err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
    res.status(err.statusCode || 500).send(err.message);
  });

  app.listen(PORT, () => console.log('Listening on port ' + PORT));
});
