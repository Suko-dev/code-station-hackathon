import { Router } from "express";

import { CreateIngredientController } from "../modules/ingredients/useCases/createIngredient/createIngredientController";
import { UpdateIngredientController } from "../modules/ingredients/useCases/updateIngredient/updateIngredientController";
import { Auth } from "../shared/http/middlewares/auth";

export const ingredientsRoutes = Router();
const createIngredientController = new CreateIngredientController();
const updateIngredientController = new UpdateIngredientController();

ingredientsRoutes.use(Auth);
ingredientsRoutes.post("/", createIngredientController.handle);
ingredientsRoutes.patch("/", updateIngredientController.handle);
