import { IIngredientsRepository } from "../../../ingredients/infra/IIngredientsRepository";
import { IUsersRepository } from "../../../users/infra/IUsersRepository";
import { ProductRepositoryInMemory } from "../../infra/in-memory/productRepositoryInMemory";
import { IProductsRepository } from "../../infra/IProductsRepository";
import { CreateProductUseCase } from "../createProductUseCase/createProductUseCase";
import { FindProductsUseCase } from "./findProductsUseCase";

let findProductUseCase: FindProductsUseCase;
let createProductUseCase: CreateProductUseCase;
let productRepositoryInMemory: IProductsRepository;
const mockUsersRepository: IUsersRepository = {
  update: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  findByEmail: jest.fn(),
  findById: jest.fn().mockReturnValue({ id: "1" }),
};
const mockIngredientInMemory: IIngredientsRepository = {
  update: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  list: jest.fn(),
  findByName: jest.fn(),
  verifyOwner: jest.fn(),
};
describe("Find Product", () => {
  beforeEach(() => {
    productRepositoryInMemory = new ProductRepositoryInMemory();
    findProductUseCase = new FindProductsUseCase(productRepositoryInMemory);
    createProductUseCase = new CreateProductUseCase(
      productRepositoryInMemory,
      mockUsersRepository,
      mockIngredientInMemory
    );
  });
  it("should be able to find a Product", async () => {
    const product = await createProductUseCase.execute("1", {
      name: "batata",
      ingredients: [{ ingredient: "batata", quantity: 1 }],
    });
    const resultproduct = await findProductUseCase.execute(product.id);
    expect(resultproduct).toHaveProperty("id");
  });
});
