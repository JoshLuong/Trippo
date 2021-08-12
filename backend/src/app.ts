import "dotenv/config";
import mongoose from "mongoose";
import express, { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import { User } from "database/models";
import cors from "cors";
import session from "express-session";
import path from "path";
import itineraryRouter from "./routes/itineraries";
import sharedItineraryRouter from "./routes/sharedItineraries";
import userRouter from "./routes/users";
import googleAuthRouter from "./routes/googleAuth";
import yelpFusionRouter from "./routes/yelpFusion";
import { redirectToHTTPS } from "express-http-to-https";

mongoose
  .connect(process.env.DATABASE_URL!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const app = express();
    const PORT = process.env.PORT || 4000;
    const corsOptions = {
      origin: process.env.ORIGIN,
      credentials: true,
      preflightContinue: false,
    };

    app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));

    // Serve React app from express
    app.use(
      express.static(path.join(__dirname, "..", "..", "trippo", "build"))
    );
    app.get("*", (req, res, next) => {
      if (req.path.startsWith("/api")) {
        return next();
      }
      res.sendFile(
        path.join(__dirname, "..", "..", "trippo", "build", "index.html")
      );
    });

    app.use(
      session({
        resave: true,
        secret: process.env.EXPRESS_SESSION_SECRET!,
        saveUninitialized: true,
        cookie: { secure: false },
      })
    );

    // Placed above middleware to allow un-authenticated users to view shareable itineraries
    app.use("/api/shared/itineraries", sharedItineraryRouter);

    app.use(async (req: any, res, next) => {
      const user = await User.findById(req.session.userId).exec();

      if (
        req.originalUrl !== "/api/v1/auth/google" &&
        req.originalUrl !== "/api/v1/auth/logout" &&
        req.method !== "OPTIONS" &&
        !user
      ) {
        res.status(404).send({ error: "User not found" });
        return next("Invalid user");
      }

      req.user = user;
      next();
    });

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors(corsOptions));

    app.use("/api/itineraries", itineraryRouter);
    app.use("/api/users", userRouter);
    app.use("/api/v1/auth", googleAuthRouter);
    app.use("/api/yelp", yelpFusionRouter);

    app.use(
      (err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
        res.status(err.statusCode || 500).send(err.message);
      }
    );

    app.listen(PORT, () => console.log("Listening on port " + PORT));
  });
