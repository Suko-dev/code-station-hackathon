import { IIngredientsRepository } from "../../infra/IIngredientsRepository";
import { IngredientRepositoryInMemory } from "../../infra/in-memory/ingredientRepositoryInMemory";
import { UpdateIngredientUseCase } from "./updateIngredientUseCase";

let createIngredientUseCase: UpdateIngredientUseCase;
let ingredientRepositoryInMemory: IIngredientsRepository;
const ingredientResult = {
  id: expect.any(String),
  name: "teste",
  unity_type: "teste",
  unity_price: 1,
};

describe("Update ingredient", () => {
  beforeEach(() => {
    ingredientRepositoryInMemory = new IngredientRepositoryInMemory();
    createIngredientUseCase = new UpdateIngredientUseCase(
      ingredientRepositoryInMemory
    );
  });
  it("should be able to update a ingredient", async () => {
    const ingredient = await createIngredientUseCase.execute("1", {
      name: "teste",
      unity_type: "unidade",
      unity_price: 1,
    });
    expect(ingredient).toEqual(ingredientResult);
  });
});
