import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";

import "reflect-metadata";

import { router } from "./routes";
import { AppError } from "./shared/errors/AppError";
import dbServer from "./shared/typeorm";

import "./shared/container";

dbServer("localhost");

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: `Internal Server Error - ${err.message}`,
  });
});

export { app };
