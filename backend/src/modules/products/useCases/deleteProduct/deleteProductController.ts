import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteProductUseCase } from "./deleteProductUseCase";

class DeleteProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const ProductId = request.params.id;
    const { id } = request.user;
    const deleteProductUseCase = container.resolve(DeleteProductUseCase);
    const Product = await deleteProductUseCase.execute(ProductId, id);
    return response.status(204).json(Product);
  }
}
export { DeleteProductController };
