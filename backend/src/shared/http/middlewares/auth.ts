import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "../../../modules/users/infra/typeorm/repositories/usersRepository";
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
    const { sub } = verify(token, "a3740377e4ff48fcf933e22e32c57c60");

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(String(sub));

    if (!user) {
      throw new Error("user not found");
    }

    request.user = { id: String(sub) };

    next();
  } catch (error) {
    throw new Error(error);
  }
}
