import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { InventoryService } from './inventory.service'

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private categories: any[] = [];
  constructor(private inventoryService: InventoryService) {
    this.loadCategoriesFromInventory();
  }

  private loadCategoriesFromInventory() {
    this.inventoryService.loadCategories(); 
    this.categories = this.inventoryService.getCategories();
  }


   getProductsByCategory(categoryId: number): Product[] {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.products : [];
  }

  updateProductQuantity(categoryId: number, productId: number, change: number) {
    const category = this.categories.find(cat => cat.id === categoryId);
    if (category) {
      const product = category.products.find((p: Product) => p.id === productId);
      if (product) {
        product.quantity += change;
        if (product.quantity < 0) product.quantity = 0;
        this.inventoryService.saveCategories();
      }
    }
  }
  addProduct(categoryId: number, product: Product) {
    const category = this.categories.find(cat => cat.id === categoryId);
    if (category) {
        category.addProduct(product);
        this.inventoryService.saveCategories();
    }
}
}
