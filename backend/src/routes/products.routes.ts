import { Router } from "express";

import { CreateProductController } from "../modules/products/useCases/createProductUseCase/createProductController";
import { FindProductsController } from "../modules/products/useCases/findProduct/findProductsController";
import { ListProductsController } from "../modules/products/useCases/listProducts/listProductsController";

import { UpdateProductController } from "../modules/products/useCases/updateProductUseCase/updateProductController";
import { Auth } from "../shared/http/middlewares/auth";
import catchAsync from "../shared/utils/catchAsync";

export const productsRoutes = Router();
const createProductController = new CreateProductController();
const updateProductController = new UpdateProductController();
const listProductsController = new ListProductsController();
const findProductsController = new FindProductsController();

productsRoutes.use(catchAsync(Auth));
productsRoutes.post("/", catchAsync(createProductController.handle));
productsRoutes.patch("/:id", catchAsync(updateProductController.handle));
productsRoutes.get("/", catchAsync(listProductsController.handle));
productsRoutes.get("/:id", catchAsync(findProductsController.handle));
