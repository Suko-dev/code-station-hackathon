import { inject, injectable } from "tsyringe";

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
    { name, unit_price, unit_type }: IUpdateIngredientDTO
  ): Promise<Ingredient> {
    return this.ingredientRepository.update(id, {
      name,
      unit_price,
      unit_type,
    });
  }
}

export { UpdateIngredientUseCase };
