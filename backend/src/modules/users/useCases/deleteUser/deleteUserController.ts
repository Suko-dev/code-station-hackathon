import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteUserUseCase } from "./deleteUserUseCase";

export class DeleteUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const deleteUserUseCase = container.resolve(DeleteUserUseCase);
    await deleteUserUseCase.execute(String(id));
    return response.status(200).json({
      status: "sucess",
      message: `user with id ${id} successful deleted`,
    });
  }
}
