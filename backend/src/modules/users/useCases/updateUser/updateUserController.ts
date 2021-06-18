import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserUseCase } from "./updateUserUseCase";

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, image, profit } = request.body;
    const { id } = request.user;
    const updateUserUseCase = container.resolve(UpdateUserUseCase);
    const user = await updateUserUseCase.execute({
      id: String(id),
      name,
      image,
      profit,
    });
    return response.status(200).json(user);
  }
}
export { UpdateUserController };
