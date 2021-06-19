import { IIngredientsRepository } from "../../../ingredients/infra/IIngredientsRepository";
import { IUsersRepository } from "../../../users/infra/IUsersRepository";
import { ProductRepositoryInMemory } from "../../infra/in-memory/productRepositoryInMemory";
import { IProductsRepository } from "../../infra/IProductsRepository";
import { CreateProductUseCase } from "../createProductUseCase/createProductUseCase";
import { DeleteProductUseCase } from "./deleteProductUseCase";

let deleteProductUseCase: DeleteProductUseCase;
let productRepositoryInMemory: IProductsRepository;
let createProductUseCase: CreateProductUseCase;
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
describe("Delete Product", () => {
  beforeEach(() => {
    productRepositoryInMemory = new ProductRepositoryInMemory();
    createProductUseCase = new CreateProductUseCase(
      productRepositoryInMemory,
      mockUsersRepository,
      mockIngredientInMemory
    );
    deleteProductUseCase = new DeleteProductUseCase(productRepositoryInMemory);
  });
  it("should be able to delete a Product", async () => {
    const createdProduct = await createProductUseCase.execute("1", {
      name: "teste",
      ingredients: [{ ingredient: "banana", quantity: 1 }],
    });
    await deleteProductUseCase.execute(createdProduct.id, "1");
    const Product = await productRepositoryInMemory.findById(createdProduct.id);
    expect(Product).toBeUndefined();
  });
});
