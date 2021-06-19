import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListProductsUseCase } from "./ListProductsUseCase";

class ListProductsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const listProductsUseCase = container.resolve(ListProductsUseCase);
    const products = await listProductsUseCase.execute(id);
    return response.status(200).json(products);
  }
}
export { ListProductsController };
