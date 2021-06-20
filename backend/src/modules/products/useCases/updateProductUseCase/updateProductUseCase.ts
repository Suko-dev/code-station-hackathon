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
    let price = 0;
    await this.productsRepository.verifyOwner(id, userId).catch(() => {
      throw new AppError("this ingredient doesnt belog to you", 403);
    });
    const { user } = await this.productsRepository.findById(id);
    if (ingredients) {
      ingredientsList = await Promise.all(
        ingredients.map(async (item) => {
          return (await this.ingredientsRepository.findByName(
            item.ingredient
          )) as Ingredient;
        })
      );
      price = ingredientsList.reduce((value, item, index) => {
        return item.unit_price * ingredients[index].quantity;
      }, 0);
    }
    price *= parseFloat("1") + parseFloat(String(user.profit)); // wtf ??? porque não funciona direto?
    return this.productsRepository.update(
      id,
      name,
      ingredientsList,
      Number(price.toFixed(2))
    );
  }
}
export { UpdateProductUseCase };
