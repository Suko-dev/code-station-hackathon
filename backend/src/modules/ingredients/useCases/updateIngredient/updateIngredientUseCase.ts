import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IUpdateIngredientDTO } from "../../dto/IUpdateIngredientDTO";
import { IIngredientsRepository } from "../../infra/IIngredientsRepository";
import { Ingredient } from "../../infra/typeorm/entities/ingredient";

@injectable()
class UpdateIngredientUseCase {
  constructor(
    @inject("IngredientsRepository")
    private ingredientRepository: IIngredientsRepository
  ) {}
  async execute(
    id: string,
    userId: string,
    { name, unit_price, unit_type }: IUpdateIngredientDTO
  ): Promise<Ingredient> {
    await this.ingredientRepository.verifyOwner(id, userId).catch(() => {
      throw new AppError("this ingredient doesnt belog to you", 403);
    });
    return this.ingredientRepository.update(id, {
      name,
      unit_price,
      unit_type,
    });
  }
}

export { UpdateIngredientUseCase };
