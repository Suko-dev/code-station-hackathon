import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IProductsRepository } from "../../infra/IProductsRepository";

@injectable()
class DeleteProductUseCase {
  constructor(
    @inject("ProductsRepository")
    private ProductRepository: IProductsRepository
  ) {}
  async execute(id: string, userId: string): Promise<void> {
    await this.ProductRepository.verifyOwner(id, userId).catch(() => {
      throw new AppError("this Product doesnt belog to you", 403);
    });
    await this.ProductRepository.delete(id);
  }
}

export { DeleteProductUseCase };
