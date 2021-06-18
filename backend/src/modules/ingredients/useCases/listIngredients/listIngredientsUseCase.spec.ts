import { IIngredientsRepository } from "../../infra/IIngredientsRepository";
import { IngredientRepositoryInMemory } from "../../infra/in-memory/ingredientRepositoryInMemory";
import { ListIngredientsUseCase } from "./listIngredientsUseCase";

let listIngredientUseCase: ListIngredientsUseCase;
let ingredientRepositoryInMemory: IIngredientsRepository;

describe("List ingredient", () => {
  beforeEach(() => {
    ingredientRepositoryInMemory = new IngredientRepositoryInMemory();
    listIngredientUseCase = new ListIngredientsUseCase(
      ingredientRepositoryInMemory
    );
  });
  it("should be able to list a ingredient", async () => {
    const ingredient = await listIngredientUseCase.execute("1");
    expect(ingredient).toEqual([]);
  });
});
