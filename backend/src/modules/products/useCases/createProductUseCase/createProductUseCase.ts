import { inject, injectable } from "tsyringe";

import { IIngredientsRepository } from "../../../ingredients/infra/IIngredientsRepository";
import { Ingredient } from "../../../ingredients/infra/typeorm/entities/ingredient";
import { IUsersRepository } from "../../../users/infra/IUsersRepository";
import { User } from "../../../users/infra/typeorm/entities/user";
import { IProductIngredients } from "../../dto/IProductIngredients";
import { IProductsRepository } from "../../infra/IProductsRepository";
import { Product } from "../../infra/typeorm/entities/products";

@injectable()
class CreateProductUseCase {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("IngredientsRepository")
    private ingredientsRepository: IIngredientsRepository
  ) {}

  async execute(
    userId: string,
    { name, ingredients }: IProductIngredients
  ): Promise<Product> {
    let ingredientsList: Ingredient[] = [];
    const user = (await this.usersRepository.findById(userId)) as User;
    ingredientsList = await Promise.all(
      ingredients.map(async (item) => {
        return (await this.ingredientsRepository.findByName(
          item.ingredient
        )) as Ingredient;
      })
    );
    return this.productsRepository.create(user, name, ingredientsList);
  }
}
export { CreateProductUseCase };
