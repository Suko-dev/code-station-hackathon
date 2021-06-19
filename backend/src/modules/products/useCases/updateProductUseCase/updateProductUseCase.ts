import { inject, injectable } from "tsyringe";

import { IIngredientsRepository } from "../../../ingredients/infra/IIngredientsRepository";
import { Ingredient } from "../../../ingredients/infra/typeorm/entities/ingredient";
import { IProductIngredients } from "../../dto/IProductIngredients";
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
    { name, ingredients }: IProductIngredients
  ): Promise<Product> {
    let ingredientsList: Ingredient[] = [];
    const product = await this.productsRepository.findById(id);
    if (product.user.id !== userId) {
      throw new Error("this product doenst belong to you");
    }
    ingredientsList = await Promise.all(
      ingredients.map(async (item) => {
        return (await this.ingredientsRepository.findByName(
          item.ingredient
        )) as Ingredient;
      })
    );
    return this.productsRepository.update(product.id, name, ingredientsList);
  }
}
export { UpdateProductUseCase };
