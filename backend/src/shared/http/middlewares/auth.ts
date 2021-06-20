import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "../../../config/auth";
import { AppError } from "../../errors/AppError";

export async function Auth(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(token, auth.token_secret);

    request.user = { id: String(sub) };

    next();
  } catch (error) {
    throw new AppError("invalid token");
  }
}
