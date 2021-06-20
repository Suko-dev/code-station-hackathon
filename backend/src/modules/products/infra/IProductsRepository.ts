import { Ingredient } from "../../ingredients/infra/typeorm/entities/ingredient";
import { User } from "../../users/infra/typeorm/entities/user";
import { Product } from "./typeorm/entities/products";

interface IProductsRepository {
  create(
    user: User,
    name: string,
    ingredients: Ingredient[],
    price: number
  ): Promise<Product>;
  update(
    id: string,
    name?: string,
    ingredients?: Ingredient[],
    total_price?: number
  ): Promise<Product>;
  list(id: string): Promise<Product[]>;
  verifyOwner(id: string, userId: string): Promise<void>;
  findById(id: string): Promise<Product>;
  delete(id: string): Promise<void>;
}
export { IProductsRepository };
