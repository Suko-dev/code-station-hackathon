import { User } from "../../../users/infra/typeorm/entities/user";
import { ICreateIngredientDTO } from "../../dto/ICreateIngredientDTO";
import { IUpdateIngredientDTO } from "../../dto/IUpdateIngredientDTO";
import { IIngredientsRepository } from "../IIngredientsRepository";
import { Ingredient } from "../typeorm/entities/ingredient";

class IngredientRepositoryInMemory implements IIngredientsRepository {
  repository: Ingredient[] = [];
  async verifyOwner(id: string, userId: string): Promise<void> {
    const item = this.repository.find((item) => item.id === id);
    if (item?.user.id !== userId) {
      throw new Error("item doesnt belong to you");
    }
  }

  async delete(id: string): Promise<void> {
    const index = this.repository.findIndex((item) => item.id === id);
    this.repository.splice(index, 1);
  }

  async list(userId: string): Promise<Ingredient[]> {
    return this.repository.filter((item) => item.user.id === userId);
  }

  async create(
    user: User,
    { name, unit_price, unit_type }: ICreateIngredientDTO
  ): Promise<Ingredient> {
    const newItem = new Ingredient();
    Object.assign(newItem, { name, unit_type, unit_price, user });
    this.repository.push(newItem);
    return newItem;
  }

  async findByName(name: string): Promise<Ingredient | undefined> {
    return this.repository.find((item) => item.name === name);
  }

  async update(
    id: string,
    { name, unit_type, unit_price }: IUpdateIngredientDTO
  ): Promise<Ingredient> {
    const ingredient = this.repository.find((item) => item.id === id);
    if (!ingredient) {
      throw new Error("ingredient not found");
    }
    Object.assign(ingredient, { name, unit_price, unit_type });
    const index = this.repository.findIndex((item) => item.id === id);
    this.repository[index] = ingredient;
    return ingredient;
  }
}
export { IngredientRepositoryInMemory };
