import { container } from "tsyringe";

import { IIngredientsRepository } from "../../modules/ingredients/infra/IIngredientsRepository";
import { IngredientsRepository } from "../../modules/ingredients/infra/typeorm/repositories/IngredientRepository";
import { IProductsRepository } from "../../modules/products/infra/IProductsRepository";
import { ProductsRepository } from "../../modules/products/infra/typeorm/repositories/ProductsRepository";
import { IUsersRepository } from "../../modules/users/infra/IUsersRepository";
import { UsersRepository } from "../../modules/users/infra/typeorm/repositories/usersRepository";

container.registerSingleton<IIngredientsRepository>(
  "IngredientsRepository",
  IngredientsRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IProductsRepository>(
  "ProductsRepository",
  ProductsRepository
);
