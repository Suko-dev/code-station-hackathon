import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListIngredientsUseCase } from "./listIngredientsUseCase";

class ListIngredientsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const listIngredientsUseCase = container.resolve(ListIngredientsUseCase);
    const ingredients = await listIngredientsUseCase.execute(id);
    return response.status(200).json(ingredients);
  }
}
export { ListIngredientsController };
