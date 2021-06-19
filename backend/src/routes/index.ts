import { NextFunction, Request, Response, Router } from "express";

import { AppError } from "../shared/errors/AppError";
import ErrorHandler from "../shared/errors/ErrorHandler";
import { ingredientsRoutes } from "./ingredients.routes";
import { productsRoutes } from "./products.routes";
import { usersRoutes } from "./users.routes";

export const router = Router();

router.use("/users", usersRoutes);
router.use("/ingredients", ingredientsRoutes);
router.use("/products", productsRoutes);
router.all("*", (request: Request, response: Response, next: NextFunction) => {
  next(new AppError(`page ${request.originalUrl} not found`, 404));
});
router.use(ErrorHandler);
