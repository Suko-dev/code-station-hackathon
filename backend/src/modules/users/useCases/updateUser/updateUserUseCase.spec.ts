import { UsersRepositoryInMemory } from "../../infra/in-memory/usersRepositoryInMemory";
import { IUsersRepository } from "../../infra/IUsersRepository";
import { CreateUserUseCase } from "../createUser/createUserUseCase";
import { UpdateUserUseCase } from "./updateUserUseCase";

let updateUserUseCase: UpdateUserUseCase;
let createUserUseCase: CreateUserUseCase;

let userRepositoryInMemory: IUsersRepository;
const UserResult = {
  id: expect.any(String),
  name: "teste",
  email: expect.any(String),
  password: expect.any(String),
  image: "teste",
  profit: 0.3,
};

describe("Update User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory();
    updateUserUseCase = new UpdateUserUseCase(userRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });
  it("should be able to update a User", async () => {
    const { user } = await createUserUseCase.execute({
      email: "teste@email.com",
      password: "teste",
    });
    const User = await updateUserUseCase.execute({
      name: "teste",
      id: user.id,
      image: "teste",
      profit: 0.3,
    });
    expect(User).toEqual(UserResult);
  });
});
