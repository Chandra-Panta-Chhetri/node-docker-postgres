import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import routes from "../api";
import config from "../config";
import { isCelebrateError } from "celebrate";
import morgan from "morgan";

export default async ({ app }: { app: express.Application }) => {
  app.enable("trust proxy");
  app.use(morgan("dev"));
  app.use(cors());
  app.use(express.json());
  app.use(config.api.prefix, routes());

  //Catches 404 api routes
  app.use(`${config.api.prefix}/*`, (req, res, next) => {
    const err = new Error(`${req.method} request to ${req.originalUrl} does not exist!`);
    err.status = 404;
    err.name = "NotFoundError";
  });

  //Catches Celebrate Errors
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (!isCelebrateError(err)) {
      return next(err);
    }
    return res.status(400).send(err.details.get("body")).end();
  });

  //Catches other errors
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    switch (err.name) {
      case "UnauthorizedError":
      case "AuthenticationError":
        return res.status(401).send({ message: err.message }).end();
      case "Validation failed":
        return res.status(400).send({ message: err.message }).end();
      default:
        return res.status(500).send({ message: "Internal Server Error" }).end();
    }
  });
};
