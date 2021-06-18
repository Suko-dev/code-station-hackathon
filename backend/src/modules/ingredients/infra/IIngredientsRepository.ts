import { User } from "../../users/infra/typeorm/entities/user";
import { ICreateIngredientDTO } from "../dto/ICreateIngredientDTO";
import { IUpdateIngredientDTO } from "../dto/IUpdateIngredientDTO";
import { Ingredient } from "./typeorm/entities/ingredient";

interface IIngredientsRepository {
  create(user: User, data: ICreateIngredientDTO): Promise<Ingredient>;
  findByName(name: string): Promise<Ingredient | undefined>;
  update(id: string, data: IUpdateIngredientDTO): Promise<Ingredient>;
  list(userId: string): Promise<Ingredient[]>;
  delete(id: string, userId: string): Promise<void>;
}

export { IIngredientsRepository };
