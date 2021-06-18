import { IUsersRepository } from "../../../users/infra/IUsersRepository";
import { IIngredientsRepository } from "../../infra/IIngredientsRepository";
import { IngredientRepositoryInMemory } from "../../infra/in-memory/ingredientRepositoryInMemory";
import { CreateIngredientUseCase } from "./createIngredientUseCase";

let createIngredientUseCase: CreateIngredientUseCase;
let ingredientRepositoryInMemory: IIngredientsRepository;
const mockRepositoryInMemory: IUsersRepository = {
  update: jest.fn(),
  create: jest.fn().mockReturnValue({ id: "1" }),
  delete: jest.fn(),
  findByEmail: jest.fn(),
  findById: jest.fn(),
};
describe("Create ingredient", () => {
  beforeEach(() => {
    ingredientRepositoryInMemory = new IngredientRepositoryInMemory();
    createIngredientUseCase = new CreateIngredientUseCase(
      ingredientRepositoryInMemory,
      mockRepositoryInMemory
    );
  });
  it("should be able to create a new ingredient", async () => {
    const ingredient = await createIngredientUseCase.execute("1", {
      name: "teste",
      unit_type: "unidade",
      unit_price: 1,
    });
    expect(ingredient).toHaveProperty("id");
  });
});
