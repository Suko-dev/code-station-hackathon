import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindUserUseCase } from "./findUserUseCase";

export class FindUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const findUserUseCase = container.resolve(FindUserUseCase);
    const user = await findUserUseCase.execute(id);
    return response.status(200).json(user);
  }
}
