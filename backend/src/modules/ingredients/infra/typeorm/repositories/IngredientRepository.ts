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

  async verifyOwner(id: string, userId: string): Promise<void> {
    await this.ingredientRepository.findOneOrFail({
      where: { id, user: { id: userId } },
    });
  }

  async delete(id: string): Promise<void> {
    await this.ingredientRepository.delete({ id });
  }

  async list(id: string): Promise<Ingredient[]> {
    return this.ingredientRepository.find({
      where: {
        user: { id },
      },
    });
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
    const ingredient = await this.ingredientRepository.findOne({ name });
    return ingredient;
  }

  async update(
    id: string,
    { unit_type, name, unit_price }: IUpdateIngredientDTO
  ): Promise<Ingredient> {
    await this.ingredientRepository.update(
      { id },
      {
        unit_price,
        unit_type,
        name,
      }
    );
    return this.ingredientRepository.findOneOrFail({
      where: { id },
    });
  }
}

export { IngredientsRepository };
