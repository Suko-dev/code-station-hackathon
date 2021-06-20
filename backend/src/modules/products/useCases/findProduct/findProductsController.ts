import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindProductsUseCase } from "./findProductsUseCase";

class FindProductsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const findProductsUseCase = container.resolve(FindProductsUseCase);
    const products = await findProductsUseCase.execute(id);
    return response.status(200).json(products);
  }
}
export { FindProductsController };
