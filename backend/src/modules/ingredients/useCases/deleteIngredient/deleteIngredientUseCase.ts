import { inject, injectable } from "tsyringe";

import { IIngredientsRepository } from "../../infra/IIngredientsRepository";

@injectable()
class DeleteIngredientUseCase {
  constructor(
    @inject("IngredientsRepository")
    private ingredientRepository: IIngredientsRepository
  ) {}
  async execute(id: string, userId: string): Promise<void> {
    await this.ingredientRepository.delete(id, userId);
  }
}

export { DeleteIngredientUseCase };
