import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthUserUseCase } from "./authUserUseCase";

class AuthUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authUserUseCase = container.resolve(AuthUserUseCase);
    const user = await authUserUseCase.execute({
      email,
      password,
    });
    return response.status(200).json(user);
  }
}
export { AuthUserController };
