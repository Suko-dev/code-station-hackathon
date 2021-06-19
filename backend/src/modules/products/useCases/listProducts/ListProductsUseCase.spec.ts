import { ProductRepositoryInMemory } from "../../infra/in-memory/productRepositoryInMemory";
import { IProductsRepository } from "../../infra/IProductsRepository";
import { ListProductsUseCase } from "./listProductsUseCase";

let listProductUseCase: ListProductsUseCase;
let productRepositoryInMemory: IProductsRepository;

describe("List Product", () => {
  beforeEach(() => {
    productRepositoryInMemory = new ProductRepositoryInMemory();
    listProductUseCase = new ListProductsUseCase(productRepositoryInMemory);

  });
  it("should be able to list a Product", async () => {
    const product = await listProductUseCase.execute("1");
    expect(product).toEqual([]);
  });
});
