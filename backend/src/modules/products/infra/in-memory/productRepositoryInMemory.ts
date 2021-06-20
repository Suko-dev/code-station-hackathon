import { Ingredient } from "../../../ingredients/infra/typeorm/entities/ingredient";
import { User } from "../../../users/infra/typeorm/entities/user";
import { IProductsRepository } from "../IProductsRepository";
import { Product } from "../typeorm/entities/products";

class ProductRepositoryInMemory implements IProductsRepository {
  repository: Product[] = [];

  async findById(id: string): Promise<Product> {
    return this.repository.find((item) => item.id === id) as Product;
  }
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

  async list(userId: string): Promise<Product[]> {
    return this.repository.filter((item) => item.user.id === userId);
  }

  async create(
    user: User,
    name: string,
    ingredients: Ingredient[]
  ): Promise<Product> {
    const newItem = new Product();
    Object.assign(newItem, { name, user, ingredients });
    this.repository.push(newItem);
    return newItem;
  }

  async findByName(name: string): Promise<Product | undefined> {
    return this.repository.find((item) => item.name === name);
  }

  async update(
    id: string,
    name: string,
    ingredients: Ingredient[]
  ): Promise<Product> {
    const Product = this.repository.find((item) => item.id === id);
    if (!Product) {
      throw new Error("Product not found");
    }
    Object.assign(Product, { name, ingredients });
    const index = this.repository.findIndex((item) => item.id === id);
    this.repository[index] = Product;
    return Product;
  }
}
export { ProductRepositoryInMemory };
