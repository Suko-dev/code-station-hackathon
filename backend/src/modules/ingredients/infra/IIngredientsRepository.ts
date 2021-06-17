import { ICreateIngredientDTO } from "../dto/ICreateIngredientDTO";
import { IUpdateIngredientDTO } from "../dto/IUpdateIngredientDTO";
import { Ingredient } from "./typeorm/entities/ingredient";

interface IIngredientsRepository {
  create(userId: string, data: ICreateIngredientDTO): Promise<void>;
  findByName(username: string): Promise<Ingredient | undefined>;
  update(userId: string, data: IUpdateIngredientDTO): Promise<Ingredient>;
}

export { IIngredientsRepository };
