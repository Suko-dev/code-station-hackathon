import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IIngredientsRepository } from "../../../ingredients/infra/IIngredientsRepository";
import { Ingredient } from "../../../ingredients/infra/typeorm/entities/ingredient";
import { IUsersRepository } from "../../../users/infra/IUsersRepository";
import { User } from "../../../users/infra/typeorm/entities/user";
import { IProductIngredients } from "../../dto/IProductIngredients";
import { IProductsRepository } from "../../infra/IProductsRepository";
import { Product } from "../../infra/typeorm/entities/products";

interface IReturnProduct {
  id: string;
  name: string;
}
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
  ): Promise<IReturnProduct> {
    let ingredientsList: Ingredient[] = [];
    const createUser = (await this.usersRepository.findById(userId)) as User;
    ingredientsList = await Promise.all(
      ingredients.map(async (item) => {
        const ingredient = (await this.ingredientsRepository.findByName(
          item.ingredient
        )) as Ingredient;
        await this.ingredientsRepository
          .verifyOwner(ingredient.id, userId)
          .catch(() => {
            throw new AppError("Ingredient not found");
          });
        return ingredient;
      })
    );
    let price = ingredientsList.reduce((value, item, index) => {
      return item.unit_price * ingredients[index].quantity;
    }, 0);
    price *= parseFloat("1") + parseFloat(String(createUser.profit));
    const { user, ...product } = await this.productsRepository.create(
      createUser,
      name,
      ingredientsList,
      Number(price.toFixed(2))
    );
    return product;
  }
}
export { CreateProductUseCase };
