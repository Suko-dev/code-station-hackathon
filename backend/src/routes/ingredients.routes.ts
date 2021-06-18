import { Router } from "express";

import { CreateIngredientController } from "../modules/ingredients/useCases/createIngredient/createIngredientController";
import { DeleteIngredientController } from "../modules/ingredients/useCases/deleteIngredient/deleteIngredientController";
import { ListIngredientsController } from "../modules/ingredients/useCases/listIngredients/listIngredientsController";
import { UpdateIngredientController } from "../modules/ingredients/useCases/updateIngredient/updateIngredientController";
import { Auth } from "../shared/http/middlewares/auth";

export const ingredientsRoutes = Router();
const createIngredientController = new CreateIngredientController();
const updateIngredientController = new UpdateIngredientController();
const listIngredientController = new ListIngredientsController();
const deleteIngredientController = new DeleteIngredientController();

ingredientsRoutes.use(Auth);
ingredientsRoutes.post("/", createIngredientController.handle);
ingredientsRoutes.patch("/:id", updateIngredientController.handle);
ingredientsRoutes.get("/", listIngredientController.handle);
ingredientsRoutes.delete("/:id", deleteIngredientController.handle);
ingredientsRoutes.patch("/", updateIngredientController.handle);
