import { IIngredientsRepository } from "../../infra/IIngredientsRepository";
import { IngredientRepositoryInMemory } from "../../infra/in-memory/ingredientRepositoryInMemory";
import { CreateIngredientUseCase } from "./createIngredientUseCase";

let createIngredientUseCase: CreateIngredientUseCase;
let ingredientRepositoryInMemory: IIngredientsRepository;
const ingredientResult = {
  id: expect.any(String),
  name: "teste",
  unity_type: "teste",
  unity_price: 1,
};

describe("Create ingredient", () => {
  beforeEach(() => {
    ingredientRepositoryInMemory = new IngredientRepositoryInMemory();
    createIngredientUseCase = new CreateIngredientUseCase(
      ingredientRepositoryInMemory
    );
  });
  it("should be able to create a new ingredient", async () => {
    await createIngredientUseCase.execute("1", {
      name: "teste",
      unity_type: "unidade",
      unity_price: 1,
    });
    expect(ingredientRepositoryInMemory.create).toBeCalled();
  });
});
