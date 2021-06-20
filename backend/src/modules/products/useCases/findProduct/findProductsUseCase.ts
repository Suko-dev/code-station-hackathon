import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IProductsRepository } from "../../infra/IProductsRepository";
import { Product } from "../../infra/typeorm/entities/products";

@injectable()
class FindProductsUseCase {
  constructor(
    @inject("ProductsRepository")
    private ProductRepository: IProductsRepository
  ) {}
  async execute(id: string): Promise<Product> {
    return this.ProductRepository.findById(id).catch(() => {
      throw new AppError("product not found", 404);
    });
  }
}

export { FindProductsUseCase };
