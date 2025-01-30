import { Product } from './product.model';

export class Category {
  public products: Product[] = [];

  constructor(public id: string, public name: string) {}

  addProduct(product: Product) {
    this.products.push(product);
  }
}
