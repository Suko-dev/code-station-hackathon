import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "../../../config/auth";
import { UserTokensRepository } from "../../../modules/users/infra/typeorm/repositories/tokenRepository";
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
    const { sub } = verify(token, auth.refresh_token_secret);
    const repository = new UserTokensRepository();
    const user = await repository.findByUserId(String(sub), token);
    if (!user) {
      throw new AppError("no user was found with this token");
    }
    request.user = { id: String(sub) };

    next();
  } catch (error) {
    throw new AppError("invalid token");
  }
}
