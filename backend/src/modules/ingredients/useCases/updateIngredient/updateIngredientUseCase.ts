import { inject, injectable } from "tsyringe";

import { IUpdateIngredientDTO } from "../../dto/IUpdateIngredientDTO";
import { IIngredientsRepository } from "../../infra/IIngredientsRepository";

@injectable()
class UpdateIngredientUseCase {
  constructor(
    @inject("IngredientsRepository")
    private ingredientRepository: IIngredientsRepository
  ) {}
  async execute(
    userId: string,
    { name, unity_price, unity_type }: IUpdateIngredientDTO
  ): Promise<void> {
    await this.ingredientRepository.update(userId, {
      name,
      unity_type,
      unity_price,
    });
  }
}

export { UpdateIngredientUseCase };
