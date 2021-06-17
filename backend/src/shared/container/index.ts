import { container } from "tsyringe";

import { IIngredientsRepository } from "../../modules/ingredients/infra/IIngredientsRepository";
import { IngredientsRepository } from "../../modules/ingredients/infra/typeorm/repositories/IngredientRepository";

container.registerSingleton<IIngredientsRepository>(
  "IngredientsRepository",
  IngredientsRepository
);
