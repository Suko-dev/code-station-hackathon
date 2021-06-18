import { UsersRepositoryInMemory } from "../../infra/in-memory/usersRepositoryInMemory";
import { IUsersRepository } from "../../infra/IUsersRepository";
import { CreateUserUseCase } from "../createUser/createUserUseCase";
import { AuthUserUseCase } from "./authUserUseCase";

let authUserUseCase: AuthUserUseCase;
let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: IUsersRepository;

describe("auth User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory();
    authUserUseCase = new AuthUserUseCase(userRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });
  it("should be able to auth a User", async () => {
    await createUserUseCase.execute({
      email: "teste",
      password: "teste",
    });
    const user = await authUserUseCase.execute({
      email: "teste",
      password: "teste",
    });
    expect(user).toHaveProperty("token");
  });
});
