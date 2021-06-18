import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../../users/infra/IUsersRepository";
import { User } from "../../../users/infra/typeorm/entities/user";
import { ICreateIngredientDTO } from "../../dto/ICreateIngredientDTO";
import { IIngredientsRepository } from "../../infra/IIngredientsRepository";
import { Ingredient } from "../../infra/typeorm/entities/ingredient";

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
  ): Promise<Ingredient> {
    const user = (await this.usersRepository.findById(userId)) as User;
    return this.ingredientRepository.create(user, {
      name,
      unit_type,
      unit_price,
    });
  }
}

export { CreateIngredientUseCase };
