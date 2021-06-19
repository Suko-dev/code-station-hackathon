/* eslint-disable prettier/prettier */
import { inject, injectable } from "tsyringe";

import { IProductsRepository } from "../../infra/IProductsRepository";
import { Product } from "../../infra/typeorm/entities/products";

@injectable()
class ListProductsUseCase {
  constructor(
    @inject("ProductsRepository")
    private ProductRepository: IProductsRepository
  ) { }

  async execute(id: string): Promise<Product[]> {
    return this.ProductRepository.list(id);
  }
}

export { ListProductsUseCase };
