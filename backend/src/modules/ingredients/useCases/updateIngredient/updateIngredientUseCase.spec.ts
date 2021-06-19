import { IUsersRepository } from "../../../users/infra/IUsersRepository";
import { IIngredientsRepository } from "../../infra/IIngredientsRepository";
import { IngredientRepositoryInMemory } from "../../infra/in-memory/ingredientRepositoryInMemory";
import { CreateIngredientUseCase } from "../createIngredient/createIngredientUseCase";
import { UpdateIngredientUseCase } from "./updateIngredientUseCase";

let updateIngredientUseCase: UpdateIngredientUseCase;
let ingredientRepositoryInMemory: IIngredientsRepository;
let createIngredientUseCase: CreateIngredientUseCase;
const mockRepositoryInMemory: IUsersRepository = {
  update: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  findByEmail: jest.fn(),
  findById: jest.fn().mockReturnValue({ id: "1" }),
};

const ingredientResult = {
  id: expect.any(String),
  name: "novo teste",
  unit_type: "unidade",
  unit_price: 2,
  user: expect.any(Object),
};

describe("Update ingredient", () => {
  beforeEach(() => {
    ingredientRepositoryInMemory = new IngredientRepositoryInMemory();
    updateIngredientUseCase = new UpdateIngredientUseCase(
      ingredientRepositoryInMemory
    );
    createIngredientUseCase = new CreateIngredientUseCase(
      ingredientRepositoryInMemory,
      mockRepositoryInMemory
    );
  });
  it("should be able to update a ingredient", async () => {
    const newIngredient = await createIngredientUseCase.execute("1", {
      name: "teste",
      unit_price: 1,
      unit_type: "teste",
    });

    const ingredient = await updateIngredientUseCase.execute(
      newIngredient.id,
      "1",
      {
        name: "novo teste",
        unit_type: "unidade",
        unit_price: 2,
      }
    );
    expect(ingredient).toEqual(ingredientResult);
  });
});
