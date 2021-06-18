import { IUsersRepository } from "../../../users/infra/IUsersRepository";
import { IIngredientsRepository } from "../../infra/IIngredientsRepository";
import { IngredientRepositoryInMemory } from "../../infra/in-memory/ingredientRepositoryInMemory";
import { CreateIngredientUseCase } from "../createIngredient/createIngredientUseCase";
import { DeleteIngredientUseCase } from "./deleteIngredientUseCase";

let deleteIngredientUseCase: DeleteIngredientUseCase;
let ingredientRepositoryInMemory: IIngredientsRepository;
let createIngredientUseCase: CreateIngredientUseCase;
const mockRepositoryInMemory: IUsersRepository = {
  update: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  findByEmail: jest.fn(),
  findById: jest.fn().mockReturnValue({ id: "1" }),
};
describe("Delete ingredient", () => {
  beforeEach(() => {
    ingredientRepositoryInMemory = new IngredientRepositoryInMemory();
    createIngredientUseCase = new CreateIngredientUseCase(
      ingredientRepositoryInMemory,
      mockRepositoryInMemory
    );
    deleteIngredientUseCase = new DeleteIngredientUseCase(
      ingredientRepositoryInMemory
    );
  });
  it("should be able to delete a ingredient", async () => {
    const createdIngredient = await createIngredientUseCase.execute("1", {
      name: "teste",
      unit_type: "teste",
      unit_price: 1,
    });
    await deleteIngredientUseCase.execute(createdIngredient.id, "1");
    const ingredient = await ingredientRepositoryInMemory.findByName("teste");
    expect(ingredient).toBeUndefined();
  });
});
