import { Router } from "express";

import { CreateProductController } from "../modules/products/useCases/createProductUseCase/createProductController";
import { ListProductsController } from "../modules/products/useCases/listProducts/ListProductsController";
import { UpdateProductController } from "../modules/products/useCases/updateProductUseCase/updateProductController";
import { Auth } from "../shared/http/middlewares/auth";
import catchAsync from "../shared/utils/catchAsync";

export const productsRoutes = Router();
const createProductController = new CreateProductController();
const updateProductController = new UpdateProductController();
const listProductsController = new ListProductsController();

productsRoutes.use(Auth);
productsRoutes.post("/", catchAsync(createProductController.handle));
productsRoutes.patch("/:id", catchAsync(updateProductController.handle));
productsRoutes.get("/", catchAsync(listProductsController.handle));
