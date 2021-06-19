import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IIngredientsRepository } from "../../../ingredients/infra/IIngredientsRepository";
import { Ingredient } from "../../../ingredients/infra/typeorm/entities/ingredient";
import { IUpdateProduct } from "../../dto/IUpdateProduct";

import { IProductsRepository } from "../../infra/IProductsRepository";
import { Product } from "../../infra/typeorm/entities/products";

@injectable()
class UpdateProductUseCase {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository,
    @inject("IngredientsRepository")
    private ingredientsRepository: IIngredientsRepository
  ) {}

  async execute(
    userId: string,
    id: string,
    { name, ingredients }: IUpdateProduct
  ): Promise<Product> {
    let ingredientsList: Ingredient[] = [];
    await this.productsRepository.verifyOwner(id, userId).catch(() => {
      throw new AppError("this ingredient doesnt belog to you", 403);
    });
    if (ingredients) {
      ingredientsList = await Promise.all(
        ingredients.map(async (item) => {
          return (await this.ingredientsRepository.findByName(
            item.ingredient
          )) as Ingredient;
        })
      );
    }
    return this.productsRepository.update(id, name, ingredientsList);

  }
}
export { UpdateProductUseCase };
