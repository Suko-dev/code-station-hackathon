import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../../users/infra/IUsersRepository";
import { User } from "../../../users/infra/typeorm/entities/user";
import { ICreateIngredientDTO } from "../../dto/ICreateIngredientDTO";
import { IIngredientsRepository } from "../../infra/IIngredientsRepository";
import { Ingredient } from "../../infra/typeorm/entities/ingredient";

interface IReturnIngredient {
  id: string;
  name: string;
}
@injectable()
class CreateIngredientUseCase {
  constructor(
    @inject("IngredientsRepository")
    private ingredientRepository: IIngredientsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute(
    userId: string,
    { name, unit_price, unit_type }: ICreateIngredientDTO
  ): Promise<IReturnIngredient> {
    const createUser = (await this.usersRepository.findById(userId)) as User;
    const { user, ...ingredient } = await this.ingredientRepository.create(
      createUser,
      {
        name,
        unit_type,
        unit_price,
      }
    );
    return ingredient;
  }
}

export { CreateIngredientUseCase };
