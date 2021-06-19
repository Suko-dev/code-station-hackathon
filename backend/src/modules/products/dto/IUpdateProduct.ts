export interface IUpdateProduct {
  name?: string;
  ingredients?: [{ ingredient: string; quantity: number }];
}
