import { Router } from "express";

import { CreateIngredientController } from "../modules/ingredients/useCases/createIngredient/createIngredientController";
import { UpdateIngredientController } from "../modules/ingredients/useCases/updateIngredient/updateIngredientController";

export const ingredientsRoutes = Router();
const createIngredientController = new CreateIngredientController();
const updateIngredientController = new UpdateIngredientController();

ingredientsRoutes.post("/", createIngredientController.handle);
ingredientsRoutes.patch("/", updateIngredientController.handle);
