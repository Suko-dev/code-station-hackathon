import { Router } from "express";

import { CreateIngredientController } from "../modules/ingredients/useCases/createIngredient/createIngredientController";
import { UpdateIngredientController } from "../modules/ingredients/useCases/updateIngredient/updateIngredientController";

export const ingredientsRouter = Router();
const createIngredientController = new CreateIngredientController();
const updateIngredientController = new UpdateIngredientController();

ingredientsRouter.post("/", createIngredientController.handle);
ingredientsRouter.patch("/", updateIngredientController.handle);
