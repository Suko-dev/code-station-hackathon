import { NextFunction, Request, Response } from "express";

import { AppError } from "./AppError";

export default async (
  error: AppError,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): Promise<Response> => {
  // eslint-disable-next-line no-param-reassign
  error.statusCode = error.statusCode || 500;
  return response
    .status(error.statusCode)
    .json({ status: error.status, message: error.message });
};
