import { Router } from "express";

import { ingredientsRoutes } from "./ingredients.routes";
import { productsRoutes } from "./products.routes";
import { usersRoutes } from "./users.routes";

export const router = Router();

router.use("/users", usersRoutes);
router.use("/ingredients", ingredientsRoutes);
router.use("/products", productsRoutes);
