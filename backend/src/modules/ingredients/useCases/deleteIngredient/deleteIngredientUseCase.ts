import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IIngredientsRepository } from "../../infra/IIngredientsRepository";

@injectable()
class DeleteIngredientUseCase {
  constructor(
    @inject("IngredientsRepository")
    private ingredientRepository: IIngredientsRepository
  ) {}
  async execute(id: string, userId: string): Promise<void> {
    await this.ingredientRepository.verifyOwner(id, userId).catch(() => {
      throw new AppError("this ingredient doesnt belog to you", 403);
    });
    await this.ingredientRepository.delete(id);

  }
}

export { DeleteIngredientUseCase };
