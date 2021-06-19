import { Router } from "express";

import { CreateIngredientController } from "../modules/ingredients/useCases/createIngredient/createIngredientController";
import { DeleteIngredientController } from "../modules/ingredients/useCases/deleteIngredient/deleteIngredientController";
import { ListIngredientsController } from "../modules/ingredients/useCases/listIngredients/listIngredientsController";
import { UpdateIngredientController } from "../modules/ingredients/useCases/updateIngredient/updateIngredientController";
import { Auth } from "../shared/http/middlewares/auth";
import catchAsync from "../shared/utils/catchAsync";

export const ingredientsRoutes = Router();
const createIngredientController = new CreateIngredientController();
const updateIngredientController = new UpdateIngredientController();
const listIngredientController = new ListIngredientsController();
const deleteIngredientController = new DeleteIngredientController();

ingredientsRoutes.use(catchAsync(Auth));

ingredientsRoutes.post("/", catchAsync(createIngredientController.handle));
ingredientsRoutes.patch("/:id", catchAsync(updateIngredientController.handle));
ingredientsRoutes.get("/", catchAsync(listIngredientController.handle));
ingredientsRoutes.delete("/:id", catchAsync(deleteIngredientController.handle));
ingredientsRoutes.patch("/", catchAsync(updateIngredientController.handle));
