export class Product {
  constructor(
    public id: string,
    public name: string,
    public quantity: number,
    public price: number,
    public supplier: string,
    public minimum: number,
    public date: Date = new Date(),
    public initialQuantity: number,
    public stockIn: { quantity: number; date: Date }[] = [],
    public stockOut: {
      quantity: number;
      date: Date;
      client: string;
      salePrice: number;
    }[] = [],
  ) {}

  get total(): number {
    return this.quantity * this.price;
  }
}
