import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteIngredientUseCase } from "./deleteIngredientUseCase";

class DeleteIngredientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const ingredientId = request.params.id;
    const { id } = request.user;
    const deleteIngredientUseCase = container.resolve(DeleteIngredientUseCase);
    const ingredient = await deleteIngredientUseCase.execute(ingredientId, id);
    return response.status(204).json(ingredient);
  }
}
export { DeleteIngredientController };
