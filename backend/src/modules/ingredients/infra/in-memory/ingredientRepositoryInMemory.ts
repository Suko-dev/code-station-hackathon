import { ICreateIngredientDTO } from "../../dto/ICreateIngredientDTO";
import { IUpdateIngredientDTO } from "../../dto/IUpdateIngredientDTO";
import { IIngredientsRepository } from "../IIngredientsRepository";
import { Ingredient } from "../typeorm/entities/ingredient";

class IngredientRepositoryInMemory implements IIngredientsRepository {
  create(userId: string, data: ICreateIngredientDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findByName(username: string): Promise<Ingredient | undefined> {
    throw new Error("Method not implemented.");
  }
  update(userId: string, data: IUpdateIngredientDTO): Promise<Ingredient> {
    throw new Error("Method not implemented.");
  }
}
export { IngredientRepositoryInMemory };
