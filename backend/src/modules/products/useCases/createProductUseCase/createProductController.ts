import { Request, Response } from "express";
import { container } from "tsyringe";

import { IProductIngredients } from "../../dto/IProductIngredients";
import { CreateProductUseCase } from "./createProductUseCase";

export class CreateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, ingredients }: IProductIngredients = request.body;
    const { id } = request.user;
    const createUserUseCase = container.resolve(CreateProductUseCase);
    const product = await createUserUseCase.execute(id, {
      name,
      ingredients,
    });
    return response.status(201).json(product);
  }
}
