import { getRepository, Repository } from "typeorm";

import { User } from "../../../../users/infra/typeorm/entities/user";
import { ICreateIngredientDTO } from "../../../dto/ICreateIngredientDTO";
import { IUpdateIngredientDTO } from "../../../dto/IUpdateIngredientDTO";
import { IIngredientsRepository } from "../../IIngredientsRepository";
import { Ingredient } from "../entities/ingredient";

class IngredientsRepository implements IIngredientsRepository {
  private ingredientRepository: Repository<Ingredient>;
  constructor() {
    this.ingredientRepository = getRepository(Ingredient);
  }
  async create(
    user: User,
    { name, unit_price, unit_type }: ICreateIngredientDTO
  ): Promise<Ingredient> {
    const ingredient = this.ingredientRepository.create({
      user,
      name,
      unit_price,
      unit_type,
    });
    return this.ingredientRepository.save(ingredient);
  }
  async findByName(name: string): Promise<Ingredient | undefined> {
    throw new Error("Method not implemented.");
  }
  async update(
    userId: string,
    data: IUpdateIngredientDTO
  ): Promise<Ingredient> {
    throw new Error("Method not implemented.");
  }
}

export { IngredientsRepository };
