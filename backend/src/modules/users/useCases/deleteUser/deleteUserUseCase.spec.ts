import { UsersRepositoryInMemory } from "../../infra/in-memory/usersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/createUserUseCase";
import { DeleteUserUseCase } from "./deleteUserUseCase";

let deleteUserUseCase: DeleteUserUseCase;
let createUserUseCase: CreateUserUseCase;

let userRepositoryInMemory: UsersRepositoryInMemory;

describe("Create User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory();
    deleteUserUseCase = new DeleteUserUseCase(userRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });
  it("should be able to delete an existing User", async () => {
    const { user } = await createUserUseCase.execute({
      email: "teste@teste.com",
      password: "teste",
    });
    await deleteUserUseCase.execute(user.id);
    expect(
      await userRepositoryInMemory.findByEmail("teste@teste.com")
    ).toBeUndefined();
  });
});
