import { getRepository, Repository } from "typeorm";

import { Ingredient } from "../../../../ingredients/infra/typeorm/entities/ingredient";
import { User } from "../../../../users/infra/typeorm/entities/user";
import { IProductsRepository } from "../../IProductsRepository";
import { Product } from "../entities/products";

export class ProductsRepository implements IProductsRepository {
  private productsRepository: Repository<Product>;
  constructor() {
    this.productsRepository = getRepository(Product);
  }

  async update(
    id: string,
    name: string,
    ingredients: Ingredient[]
  ): Promise<Product> {
    const oldProduct = await this.productsRepository.findOneOrFail(id, {
      relations: ["user", "ingredients"],
    });
    if (ingredients) {
      await this.productsRepository
        .createQueryBuilder()
        .relation("ingredients")
        .of(oldProduct)
        .addAndRemove(ingredients, oldProduct.ingredients);
    }
    await this.productsRepository.update({ id }, { name });
    return this.productsRepository.findOneOrFail(id, {
      relations: ["user", "ingredients"],
    });
  }

  async findById(id: string): Promise<Product> {
    return this.productsRepository.findOneOrFail(id, {
      relations: ["user", "ingredients"],
    });
  }

  async create(
    user: User,
    name: string,
    ingredients: Ingredient[]
  ): Promise<Product> {
    const product = this.productsRepository.create({
      name,
      ingredients,
      user,
      total_price: 0,
    });
    return this.productsRepository.save(product);
  }
}
