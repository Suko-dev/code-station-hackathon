import { User } from "../../users/infra/typeorm/entities/user";
import { ICreateIngredientDTO } from "../dto/ICreateIngredientDTO";
import { IUpdateIngredientDTO } from "../dto/IUpdateIngredientDTO";
import { Ingredient } from "./typeorm/entities/ingredient";

interface IIngredientsRepository {
  create(user: User, data: ICreateIngredientDTO): Promise<Ingredient>;
  findByName(name: string): Promise<Ingredient | undefined>;
  update(userId: string, data: IUpdateIngredientDTO): Promise<Ingredient>;
}

export { IIngredientsRepository };
