export class Product {
    constructor(
      public id: string,
      public name: string,
      public quantity: number,
      public price: number,
      public supplier : string,
      public minimum : number,
      public date: Date = new Date()  
    ) {}
    get total(): number {
      return this.quantity * this.price;
    }
  }
  