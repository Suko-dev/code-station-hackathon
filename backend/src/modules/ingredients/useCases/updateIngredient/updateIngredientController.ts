import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateIngredientUseCase } from "./updateIngredientUseCase";

class UpdateIngredientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, unity_type, unity_price } = request.body;
    const userId = "";
    const updateIngredientUseCase = container.resolve(UpdateIngredientUseCase);
    await updateIngredientUseCase.execute(userId, {
      name,
      unity_price,
      unity_type,
    });
    return response.status(201).send();
  }
}
export { UpdateIngredientController };
