import { ICreateIngredientDTO } from "../../dto/ICreateIngredientDTO";
import { IUpdateIngredientDTO } from "../../dto/IUpdateIngredientDTO";
import { IIngredientsRepository } from "../IIngredientsRepository";
import { Ingredient } from "../typeorm/entities/ingredient";

class IngredientRepositoryInMemory implements IIngredientsRepository {
  repository: Ingredient[] = [];
  async create(
    userId: string,
    { name, unity_price, unity_type }: ICreateIngredientDTO
  ): Promise<void> {
    const newItem = new Ingredient();
    Object.assign(newItem, { name, unity_type, unity_price, userId });
    this.repository.push(newItem);
  }
  findByName(username: string): Promise<Ingredient | undefined> {
    throw new Error("Method not implemented.");
  }
  update(userId: string, data: IUpdateIngredientDTO): Promise<Ingredient> {
    throw new Error("Method not implemented.");
  }
}
export { IngredientRepositoryInMemory };
