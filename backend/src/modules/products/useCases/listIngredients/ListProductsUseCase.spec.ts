// import { ProductRepositoryInMemory } from "../../infra/in-memory/ProductRepositoryInMemory";
import { IProductsRepository } from "../../infra/IProductsRepository";
import { ListProductsUseCase } from "./ListProductsUseCase";

let listProductUseCase: ListProductsUseCase;
let ProductRepositoryInMemory: IProductsRepository;

describe("List Product", () => {
  beforeEach(() => {
    // ProductRepositoryInMemory = new ProductRepositoryInMemory();
    listProductUseCase = new ListProductsUseCase(ProductRepositoryInMemory);
  });
  it("should be able to list a Product", async () => {
    const product = await listProductUseCase.execute("1");
    expect(product).toEqual([]);
  });
});
