import { Request, Response } from "express";
import { container } from "tsyringe";

import { IProductIngredients } from "../../dto/IProductIngredients";
import { UpdateProductUseCase } from "./updateProductUseCase";

export class UpdateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, ingredients }: IProductIngredients = request.body;
    const product_id = request.params.id;
    const { id } = request.user;
    const updateUserUseCase = container.resolve(UpdateProductUseCase);
    const product = await updateUserUseCase.execute(id, product_id, {
      name,
      ingredients,
    });
    return response.status(200).json(product);
  }
}
