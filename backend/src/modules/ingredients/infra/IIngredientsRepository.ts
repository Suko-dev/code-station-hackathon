import { ICreateIngredientDTO } from "../dto/ICreateIngredientDTO";
import { Ingredient } from "./typeorm/entities/ingredient";

interface IIngredientsRepository {
  create(data: ICreateIngredientDTO): Promise<void>;
  findByName(username: string): Promise<Ingredient | undefined>;
}

export { IIngredientsRepository };
