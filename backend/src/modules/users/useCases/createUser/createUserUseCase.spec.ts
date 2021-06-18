import { UsersRepositoryInMemory } from "../../infra/in-memory/usersRepositoryInMemory";
import { IUsersRepository } from "../../infra/IUsersRepository";
import { CreateUserUseCase } from "./createUserUseCase";

let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: IUsersRepository;

describe("Create User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });
  it("should be able to create a new User", async () => {
    const user = await createUserUseCase.execute({
      email: "teste",
      password: "teste",
    });
    expect(user).toHaveProperty("user");
  });
});
