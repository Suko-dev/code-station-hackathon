import { ICreateIngredientDTO } from "../../dto/ICreateIngredientDTO";
import { IIngredientsRepository } from "../../infra/IIngredientsRepository";

class CreateIngredientUseCase {
  constructor(private ingredientRepository: IIngredientsRepository) {}
  async execute(
    userId: string,
    { name, unity_price, unity_type }: ICreateIngredientDTO
  ): Promise<void> {
    await this.ingredientRepository.create(userId, {
      name,
      unity_type,
      unity_price,
    });
  }
}

export { CreateIngredientUseCase };
