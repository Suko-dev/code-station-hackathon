import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateIngredientUseCase } from "./createIngredientUseCase";

class CreateIngredientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, unity_type, unity_price } = request.body;
    const userId = "";
    const createIngredientUseCase = container.resolve(CreateIngredientUseCase);
    await createIngredientUseCase.execute(userId, {
      name,
      unity_price,
      unity_type,
    });
    return response.status(201).send();
  }
}
export { CreateIngredientController };
