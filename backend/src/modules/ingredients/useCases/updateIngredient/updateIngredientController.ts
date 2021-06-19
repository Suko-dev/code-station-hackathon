import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateIngredientUseCase } from "./updateIngredientUseCase";

class UpdateIngredientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, unit_type, unit_price } = request.body;
    const { id } = request.params;
    const userid = request.user.id;
    const updateIngredientUseCase = container.resolve(UpdateIngredientUseCase);
    const ingredient = await updateIngredientUseCase.execute(id, userid, {
      name,
      unit_price,
      unit_type,
    });
    return response.status(200).json(ingredient);
  }
}
export { UpdateIngredientController };
