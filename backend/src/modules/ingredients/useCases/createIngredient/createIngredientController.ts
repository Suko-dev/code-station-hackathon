import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateIngredientUseCase } from "./createIngredientUseCase";

class CreateIngredientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, unit_type, unit_price } = request.body;
    const { id } = request.user;
    const createIngredientUseCase = container.resolve(CreateIngredientUseCase);
    const ingredient = await createIngredientUseCase.execute(id, {
      name,
      unit_price,
      unit_type,
    });
    return response.status(201).json(ingredient);
  }
}
export { CreateIngredientController };
