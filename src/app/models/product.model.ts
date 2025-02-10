export class Product {
    constructor(
      public id: string,
      public name: string,
      public quantity: number,
      public price: number,
      public supplier : string,
      public minimum : number
    ) {}
  }
  