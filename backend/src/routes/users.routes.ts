import { Router } from "express";

import { AuthUserController } from "../modules/users/useCases/authUser/authUserController";
import { CreateUserController } from "../modules/users/useCases/createUser/createUserController";
import { DeleteUserController } from "../modules/users/useCases/deleteUser/deleteUserController";
import { UpdateUserController } from "../modules/users/useCases/updateUser/updateUserController";

export const usersRoutes = Router();
const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const authUserController = new AuthUserController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.post("/login", authUserController.handle);
usersRoutes.patch("/", updateUserController.handle);
usersRoutes.delete("/", deleteUserController.handle);
