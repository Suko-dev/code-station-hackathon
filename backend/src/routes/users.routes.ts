import { Router } from "express";

import { AuthUserController } from "../modules/users/useCases/authUser/authUserController";
import { CreateUserController } from "../modules/users/useCases/createUser/createUserController";
import { DeleteUserController } from "../modules/users/useCases/deleteUser/deleteUserController";
import { FindUserController } from "../modules/users/useCases/findUser/findUserController";
import { RefreshTokenController } from "../modules/users/useCases/refreshToken/refreshTokenController";
import { UpdateUserController } from "../modules/users/useCases/updateUser/updateUserController";
import { Auth } from "../shared/http/middlewares/auth";
import catchAsync from "../shared/utils/catchAsync";

export const usersRoutes = Router();
const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const authUserController = new AuthUserController();
const findUserController = new FindUserController();
const refreshTokenController = new RefreshTokenController();

usersRoutes.post("/", catchAsync(createUserController.handle));
usersRoutes.post("/login", catchAsync(authUserController.handle));
usersRoutes.get("/refresh-token", catchAsync(refreshTokenController.handle));
usersRoutes.use(catchAsync(Auth));
usersRoutes.patch("/", catchAsync(updateUserController.handle));
usersRoutes.delete("/", catchAsync(deleteUserController.handle));
usersRoutes.get("/me", catchAsync(findUserController.handle));
