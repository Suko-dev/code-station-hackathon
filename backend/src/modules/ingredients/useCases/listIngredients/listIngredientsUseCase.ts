import { inject, injectable } from "tsyringe";

import { IIngredientsRepository } from "../../infra/IIngredientsRepository";
import { Ingredient } from "../../infra/typeorm/entities/ingredient";

@injectable()
class ListIngredientsUseCase {
  constructor(
    @inject("IngredientsRepository")
    private ingredientRepository: IIngredientsRepository
  ) {}
  async execute(id: string): Promise<Ingredient[]> {
    return this.ingredientRepository.list(id);
  }
}

export { ListIngredientsUseCase };
