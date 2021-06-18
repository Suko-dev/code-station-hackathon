import { Router } from "express";

import { ingredientsRoutes } from "./ingredients.routes";
import { usersRoutes } from "./users.routes";

export const router = Router();

router.use("/users", usersRoutes);
router.use("/ingredients", ingredientsRoutes);
