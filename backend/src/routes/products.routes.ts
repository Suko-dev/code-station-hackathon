import { Router } from "express";

import { CreateProductController } from "../modules/products/useCases/createProductUseCase/createProductController";
import { ListProductsController } from "../modules/products/useCases/listIngredients/ListProductsController";
import { UpdateProductController } from "../modules/products/useCases/updateProductUseCase/updateProductController";
import { Auth } from "../shared/http/middlewares/auth";

export const productsRoutes = Router();
const createProductController = new CreateProductController();
const updateProductController = new UpdateProductController();
const listProductsController = new ListProductsController();

productsRoutes.use(Auth);
productsRoutes.post("/", createProductController.handle);
productsRoutes.patch("/:id", updateProductController.handle);
productsRoutes.get("/", listProductsController.handle);
